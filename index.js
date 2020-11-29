const crypto = require('crypto')
const forge = require('node-forge');
const b32Encode = require('base32-encode')

const fingerprint = (publicKey) => {
  const cert = forge.pki.certificateFromPem(publicKey);
  const asn1 = forge.pki.publicKeyToAsn1(cert.publicKey);
  const der = forge.asn1.toDer(asn1);
  const buf = Buffer.alloc(der.length(), der.getBytes(), 'binary');
  const hash = crypto.createHash('sha256').update(buf).digest();
  const base32 = b32Encode(hash.slice(0, 30), 'RFC3548')

  // Create key id (fingerprint)
  let kid = '';
  for (let i = 0; i < 48; ++i) {
    kid += base32[i];
    if (i % 4 === 3 && (i + 1) !== 48) {
      kid += ":";
    }
  }

  return kid
}

module.exports = {
  fingerprint
}
