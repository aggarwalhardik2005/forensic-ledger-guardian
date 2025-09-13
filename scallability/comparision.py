import matplotlib.pyplot as plt
import numpy as np

# Parameters
file_size_mb = 1  # per file
eth_price = 4728.83  # USD
gas_price_gwei = 30
gas_price_eth = gas_price_gwei * 1e-9  # convert gwei to ETH

block_time=12
confirmations=3
tx_time = block_time * confirmations  # seconds

# Upload speed assumption (IPFS)
upload_speed = 15

# SSTORE gas cost
gas_per_slot = 22100  # first write
bytes_per_slot = 32
slots_per_mb = (file_size_mb * 1024 * 1024) // bytes_per_slot
gas_per_mb_onchain = slots_per_mb * gas_per_slot

# On-chain cost for 1MB
cost_per_mb_onchain = gas_per_mb_onchain * gas_price_eth * eth_price

# IPFS + metadata storage cost (~10 slots)
slots_ipfs = 10
gas_ipfs = slots_ipfs * gas_per_slot
cost_ipfs = gas_ipfs * gas_price_eth * eth_price

# File counts to compare
file_counts = np.array([10000, 20000, 30000, 40000, 50000])

# Calculate costs
onchain_costs = cost_per_mb_onchain * file_counts
ipfs_costs = cost_ipfs * file_counts

# Storage size
onchain_storage = file_counts * file_size_mb  # MB
ipfs_storage = file_counts * (320 / (1024 * 1024))  # ≈0.000305 MB per file

# ---------------- LATENCY ----------------
# On-chain: each 1MB file may need multiple tx due to gas limit
# assume 1 MB ~ 5 tx (approximate within gas limit constraints)
txs_per_file_onchain = 5
onchain_latency = file_counts * txs_per_file_onchain * tx_time

# IPFS + Blockchain: upload time + 1 metadata tx
upload_time_per_file = (file_size_mb )/upload_speed # seconds
ipfs_latency = file_counts * (upload_time_per_file + tx_time)

# ---- PLOTS ----
plt.figure(figsize=(12, 6))

# Cost comparison
plt.subplot(1, 3, 1)
plt.plot(file_counts, onchain_costs, label="On-chain", marker='o')
plt.plot(file_counts, ipfs_costs, label="IPFS + Blockchain", marker='s')
plt.yscale("log")
plt.xlabel("Number of Files (1 MB each)")
plt.ylabel("Cost (USD, log scale)")
plt.title("Cost Comparison")
plt.legend()

# # Storage comparison
plt.subplot(1, 3, 2)
plt.plot(file_counts, onchain_storage, label="On-chain", marker='o')
plt.plot(file_counts, ipfs_storage, label="IPFS+Blockchain", marker='s')
plt.xlabel("Number of Files")
plt.ylabel("Storage Size (MB, log scale)")
plt.title("Storage Size Comparison")
plt.legend()
plt.yscale("log")


# # Latency comparison
plt.subplot(1, 3, 3)
plt.plot(file_counts, onchain_latency, label="On-chain", marker='o')
plt.plot(file_counts, ipfs_latency, label="IPFS + Blockchain", marker='s')
plt.xlabel("Number of Files")
plt.ylabel("Latency (seconds)")
plt.title("Latency Comparison")
plt.legend()

plt.tight_layout()
plt.show()