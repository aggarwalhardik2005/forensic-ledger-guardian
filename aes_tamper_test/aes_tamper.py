from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import os, random, csv
import matplotlib.pyplot as plt

# ---- Parameters ----
NUM_FILES = 200
FILE_SIZE_BYTES = 200_000  # ~200 KB per file
OUTPUT_DIR = os.path.join(os.getcwd(), "aes_tamper_experiment")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Flip counts
flip_counts = [1,5,10,15,20,25,30,35,40,45,50]

# PKCS7 padding/unpadding
BS = AES.block_size
def pkcs7_pad(b):
    pad_len = BS - (len(b) % BS)
    return b + bytes([pad_len]) * pad_len

def pkcs7_unpad(b):
    pad_len = b[-1]
    return b[:-pad_len]

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
results = []  # file_index, flips_requested, raw_bit_diff, decrypt_success, flips_actual

for file_idx, path in enumerate(file_paths, start=1):
    with open(path, "rb") as f:
        plaintext = f.read()
    total_bits = len(plaintext) * 8

    key = get_random_bytes(32)
    iv = get_random_bytes(16)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    padded = pkcs7_pad(plaintext)
    ciphertext = iv + cipher.encrypt(padded)

    for flips in flip_counts:
        ct = bytearray(ciphertext)
        max_bits = len(ct) * 8
        flips_actual = min(flips, max_bits)
        if flips_actual > 0:
            positions = random.sample(range(max_bits), flips_actual)
            for bitpos in positions:
                byte_idx = bitpos // 8
                bit_in_byte = bitpos % 8
                ct[byte_idx] ^= (1 << bit_in_byte)
        try:
            iv2 = bytes(ct[:16])
            ct_body = bytes(ct[16:])
            cipher2 = AES.new(key, AES.MODE_CBC, iv2)
            decrypted_padded = cipher2.decrypt(ct_body)
            decrypted = pkcs7_unpad(decrypted_padded)
            decrypt_success = True
            diff_bits = bit_diff_count(plaintext, decrypted)
        except Exception:
            decrypt_success = False
            diff_bits = total_bits  # treat as fully different

        results.append((file_idx, flips, diff_bits, decrypt_success, flips_actual))

# Save results to CSV
csv_path = os.path.join(OUTPUT_DIR, "tampering_results.csv")
with open(csv_path, "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["file_index","flips_requested","raw_bit_diff","decrypt_success","flips_actual"])
    for row in results:
        writer.writerow(row)

# --- Aggregation across all files ---
agg = {}
for file_idx, flips, diff_bits, decrypt_success, flips_actual in results:
    agg.setdefault(flips, []).append(diff_bits)

flip_list_sorted = sorted(agg.keys())
avg_rawdiff = [sum(agg[f]) / len(agg[f]) for f in flip_list_sorted]
min_rawdiff = [min(agg[f]) for f in flip_list_sorted]

# --- Plot Average & Minimum Raw Differences (All Files) ---
plt.figure(figsize=(8,5))
plt.plot(flip_list_sorted, avg_rawdiff, marker='o', label="Average change")
plt.plot(flip_list_sorted, min_rawdiff, marker='x', linestyle="--", label="Minimum change")
plt.title("AES-256 CBC: Bit Differences vs Number of Bits Flipped (All Files)")
plt.xlabel("Number of bits flipped in ciphertext")
plt.ylabel("Bit differences in plaintext")
plt.legend()
plt.grid(True)

plt.xticks(flip_list_sorted)

# Ensure y-axis includes 1-bit flipped values
if 1 in flip_list_sorted:
    idx = flip_list_sorted.index(1)
    yvals = [int(avg_rawdiff[idx]), int(min_rawdiff[idx])]
    yticks = plt.yticks()[0].tolist()
    for yval in yvals:
        if yval not in yticks:
            yticks.append(yval)
    plt.yticks(sorted(yticks))
plt.ylim(bottom=0) 

plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, "avg_min_rawdiff_vs_flips.png"))
plt.show()


# --- Plot Example File (file_1) with Min Reference ---
example = [r for r in results if r[0]==1]
example_flips = [r[1] for r in example]
example_diffs = [r[2] for r in example]
min_example_diff = min(example_diffs)

plt.figure(figsize=(8,5))
plt.plot(example_flips, example_diffs, marker='x', label="File_1 differences")
plt.axhline(min_example_diff, color='orange', linestyle='--', label=f"Minimum = {min_example_diff}")

plt.title("AES-256 CBC: File_1 Raw Bit Differences vs Bits Flipped")
plt.xlabel("Number of bits flipped in ciphertext")
plt.ylabel("Bit differences in plaintext")
plt.legend()
plt.grid(True)

plt.xticks(example_flips)

# Ensure y-axis includes 1-bit flipped and min value
if 1 in example_flips:
    idx = example_flips.index(1)
    yval = example_diffs[idx]
    yticks = plt.yticks()[0].tolist()
    for y in [yval, min_example_diff]:
        if y not in yticks:
            yticks.append(y)
    plt.yticks(sorted(yticks))

plt.tight_layout()
plt.savefig(os.path.join(OUTPUT_DIR, "file1_min_vs_flips.png"))
plt.show()

print(f"Experiment completed. Files and results saved under: {OUTPUT_DIR}")
print(f"CSV of results: {csv_path}")
