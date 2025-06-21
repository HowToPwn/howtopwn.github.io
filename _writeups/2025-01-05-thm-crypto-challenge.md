---
layout: writeup
title: "TryHackMe Crypto Challenge: RSA Encryption Break"
date: 2025-01-05
author: "CryptoQueen"
category: "Cryptography"
difficulty: "Medium"
tags: ["Crypto", "RSA", "THM", "CTF", "Mathematics"]
---

# TryHackMe Crypto Challenge: RSA Encryption Break

This writeup covers a cryptography challenge from TryHackMe that demonstrates RSA encryption vulnerabilities and mathematical attacks.

## Challenge Overview

**Challenge Name:** RSA Master
**Difficulty:** Medium
**Category:** Cryptography
**Points:** 30

The challenge involves breaking RSA encryption by exploiting weak key generation and mathematical vulnerabilities.

## Initial Analysis

### 1. Challenge Files
- `public_key.pem` - RSA public key
- `encrypted_flag.bin` - Encrypted flag
- `hint.txt` - Challenge hint

### 2. RSA Public Key Analysis
```bash
openssl rsa -pubin -in public_key.pem -text -noout
```

**Key information:**
- Modulus (n): 2048 bits
- Public exponent (e): 65537
- Private exponent (d): Unknown

### 3. Mathematical Approach
RSA encryption: c = m^e mod n
RSA decryption: m = c^d mod n

## Vulnerability Analysis

### 1. Weak Key Generation
The challenge uses a small prime factor, making factorization possible.

### 2. Fermat's Factorization
For RSA with close prime factors, Fermat's method can be effective.

## Exploitation

### 1. Prime Factorization
```python
import math
from Crypto.PublicKey import RSA
from Crypto.Util.number import long_to_bytes

# Load public key
with open('public_key.pem', 'r') as f:
    key = RSA.import_key(f.read())

n = key.n
e = key.e

# Fermat's factorization
def fermat_factor(n):
    a = math.isqrt(n) + 1
    while True:
        b2 = a*a - n
        b = math.isqrt(b2)
        if b*b == b2:
            return a + b, a - b
        a += 1

p, q = fermat_factor(n)
```

### 2. Private Key Calculation
```python
# Calculate private key
phi = (p - 1) * (q - 1)
d = pow(e, -1, phi)

# Decrypt flag
with open('encrypted_flag.bin', 'rb') as f:
    c = int.from_bytes(f.read(), 'big')

m = pow(c, d, n)
flag = long_to_bytes(m)
print(flag.decode())
```

## Flag Capture

**Result:** `THM{rs4_w34k_k3y_g3n3r4t10n}`

## Lessons Learned

### 1. RSA Security
- Use strong prime generation
- Avoid close prime factors
- Implement proper key sizes

### 2. Mathematical Attacks
- Fermat's factorization
- Wiener's attack
- Coppersmith's method

## Tools Used
- **Python:** Mathematical calculations
- **OpenSSL:** Key analysis
- **Crypto library:** RSA operations

---

*"Cryptography is the art of keeping secrets." - CryptoQueen* 