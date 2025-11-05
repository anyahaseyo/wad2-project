#!/usr/bin/env python3
"""
Helper script to encode Firebase service account key to base64.
Usage: python encode_firebase_key.py serviceAccountKey.json
"""

import sys
import base64
import json

def encode_service_account_key(json_file_path):
    """Encode Firebase service account JSON to base64."""
    try:
        # Read the JSON file
        with open(json_file_path, 'r', encoding='utf-8') as f:
            json_content = f.read()
        
        # Validate it's valid JSON
        json.loads(json_content)
        
        # Encode to base64
        json_bytes = json_content.encode('utf-8')
        base64_encoded = base64.b64encode(json_bytes).decode('utf-8')
        
        # Remove any whitespace (shouldn't be any, but just in case)
        base64_encoded = base64_encoded.replace('\n', '').replace(' ', '').replace('\r', '')
        
        # Verify length is multiple of 4
        if len(base64_encoded) % 4 != 0:
            print(f"WARNING: Base64 length ({len(base64_encoded)}) is not a multiple of 4!")
            # Add padding
            padding = 4 - (len(base64_encoded) % 4)
            base64_encoded += '=' * padding
            print(f"Added {padding} padding characters.")
        
        print("\n" + "="*80)
        print("BASE64 ENCODED STRING (copy this to Render):")
        print("="*80)
        print(base64_encoded)
        print("="*80)
        print(f"\nLength: {len(base64_encoded)} characters")
        print(f"Length % 4: {len(base64_encoded) % 4} (should be 0)")
        print("\n[OK] Copy the string above and paste it into Render's FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 environment variable")
        print("   (Make sure to copy the ENTIRE string - it's one continuous line)")
        
        return base64_encoded
        
    except FileNotFoundError:
        print(f"[ERROR] File '{json_file_path}' not found!")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"[ERROR] Invalid JSON file: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"[ERROR] {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python encode_firebase_key.py <serviceAccountKey.json>")
        print("\nExample:")
        print("  python encode_firebase_key.py serviceAccountKey.json")
        sys.exit(1)
    
    json_file = sys.argv[1]
    encode_service_account_key(json_file)

