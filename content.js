// Function to encrypt email using PGP
function encryptEmail(content, recipientPublicKey) {
    // Use OpenPGP.js to encrypt the content
    const options = {
      message: openpgp.message.fromText(content), 
      publicKeys: openpgp.readKey({ armoredKey: recipientPublicKey })
    };
    return openpgp.encrypt(options);
  }
  
  // Monitor Gmail's send button
  document.querySelector('div[role="button"][data-tooltip*="Send"]').addEventListener('click', async function() {
    const emailBody = document.querySelector('.editable').innerText;
    const recipientEmail = document.querySelector('textarea[name="to"]').value;
  
    // Get recipient's public key (e.g., from a key directory or manually uploaded)
    const recipientPublicKey = await fetchRecipientPublicKey(recipientEmail);
    
    if (recipientPublicKey) {
      // Encrypt the email body
      const encryptedContent = await encryptEmail(emailBody, recipientPublicKey);
  
      // Replace email body with encrypted content
      document.querySelector('.editable').innerText = encryptedContent.data;
    }
  });
  
  async function fetchRecipientPublicKey(email) {
    // Fetch public key from your key directory or manual upload
    // For demonstration purposes, let's assume the key is hardcoded
    const publicKey = `-----BEGIN PGP PUBLIC KEY BLOCK----- ... -----END PGP PUBLIC KEY BLOCK-----`;
    return publicKey;
  }
  
//-------------------------------------------------------------------------------------------------------------------------

// Detect encrypted emails in Gmail inbox
function detectEncryptedEmail() {
    const emailBody = document.querySelector('.ii.gt .a3s.aXjCH').innerText;
    if (emailBody.includes('-----BEGIN PGP MESSAGE-----')) {
      // Prompt user to decrypt
      const privateKey = getUserPrivateKey();
      decryptEmail(emailBody, privateKey);
    }
  }
  
  // Function to decrypt the email
  async function decryptEmail(encryptedMessage, privateKey) {
    const options = {
      message: await openpgp.readMessage({ armoredMessage: encryptedMessage }), 
      decryptionKeys: await openpgp.readKey({ armoredKey: privateKey })
    };
  
    const decrypted = await openpgp.decrypt(options);
    displayDecryptedEmail(decrypted.data);
  }
  
  // Display the decrypted email content
  function displayDecryptedEmail(decryptedContent) {
    document.querySelector('.ii.gt .a3s.aXjCH').innerText = decryptedContent;
  }
  