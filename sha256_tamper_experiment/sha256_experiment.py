import hashlib
import os, random, csv
import matplotlib.pyplot as plt

# ---- Parameters ----
NUM_FILES = 200
FILE_SIZE_BYTES = 200_000  # ~200 KB per file
OUTPUT_DIR = os.path.join(os.getcwd(), "sha256_tamper_experiment")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Flip counts
flip_counts = [1,5,10,15,20,25,30,35,40,45,50]

# Count differing bits
def bit_diff_count(a: bytes, b: bytes) -> int:
    min_len = min(len(a), len(b))
    diff_bits = 0
    for i in range(min_len):
        x = a[i] ^ b[i]
        diff_bits += x.bit_count()
    if len(a) != len(b):
        diff_bits += abs(len(a)-len(b)) * 8
    return diff_bits

# Create files with random 0/1 characters
file_paths = []
for i in range(NUM_FILES):
    data = bytearray(random.choice((48,49)) for _ in range(FILE_SIZE_BYTES))  # ASCII '0' or '1'
    path = os.path.join(OUTPUT_DIR, f"file_{i+1}.bin")
    with open(path, "wb") as f:
        f.write(data)
    file_paths.append(path)

# Store results
results = []  # file_index, flips_requested, raw_bit_diff, flips_actual

for file_idx, path in enumerate(file_paths, start=1):
    with open(path, "rb") as f:
        original = f.read()

    # original hash
    orig_hash = hashlib.sha256(original).digest()

    for flips in flip_counts:
        tampered = bytearray(original)
        max_bits = len(tampered) * 8
        flips_actual = min(flips, max_bits)
        if flips_actual > 0:
            positions = random.sample(range(max_bits), flips_actual)
            for bitpos in positions:
                byte_idx = bitpos // 8
                bit_in_byte = bitpos % 8
                tampered[byte_idx] ^= (1 << bit_in_byte)

        tampered_hash = hashlib.sha256(tampered).digest()
        diff_bits = bit_diff_count(orig_hash, tampered_hash)

        results.append((file_idx, flips, diff_bits, flips_actual))

# Save results to CSV
csv_path = os.path.join(OUTPUT_DIR, "tampering_results.csv")
with open(csv_path, "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["file_index","flips_requested","raw_bit_diff","flips_actual"])
    for row in results:
        writer.writerow(row)

# --- Aggregation across all files ---
agg = {}
for file_idx, flips, diff_bits, flips_actual in results:
    agg.setdefault(flips, []).append(diff_bits)

flip_list_sorted = sorted(agg.keys())
avg_rawdiff = [sum(agg[f]) / len(agg[f]) for f in flip_list_sorted]
min_rawdiff = [min(agg[f]) for f in flip_list_sorted]

# --- Plot Average & Minimum Raw Differences ---
plt.figure(figsize=(8,5))
plt.plot(flip_list_sorted, avg_rawdiff, marker='o', label="Average change")
plt.plot(flip_list_sorted, min_rawdiff, marker='x', linestyle="--", label="Minimum change")
plt.title("SHA-256: Bit Differences vs Number of Bits Flipped")
plt.xlabel("Number of bits flipped in input")
plt.ylabel("Bit differences in hash output (256 bits)")
plt.legend()
plt.grid(True)

# Force x-axis ticks to include all flip values (1..max)
plt.xticks(flip_list_sorted)

# Ensure y-axis includes the exact value for 1 bit flipped
if 1 in flip_list_sorted:
    idx = flip_list_sorted.index(1)
    yvals = [int(avg_rawdiff[idx]), int(min_rawdiff[idx])]
    yticks = plt.yticks()[0].tolist()
    for yval in yvals:
        if yval not in yticks:
            yticks.append(yval)
    plt.yticks(sorted(yticks))


plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, "avg_min_rawdiff_vs_flips.png"))
plt.show()


print(f"Experiment completed. Files and results saved under: {OUTPUT_DIR}")
print(f"CSV of results: {csv_path}")
