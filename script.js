function generateEmails() {
  let input = document.getElementById("emailInput").value;
  let emails = input.split(/[\n, ]+/).filter(e => e.includes("@"));
  let unique = [...new Set(emails)];
  let duplicates = emails.length - unique.length;

  document.getElementById("output").innerText = unique.join("\n");
  document.getElementById("totalEmails").innerText = emails.length;
  document.getElementById("uniqueEmails").innerText = unique.length;
  document.getElementById("duplicatesRemoved").innerText = duplicates;
}

function copyOutput() {
  let text = document.getElementById("output").innerText;
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
}

function exportOutput() {
  let text = document.getElementById("output").innerText;
  let blob = new Blob([text], {type: "text/plain"});
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "emails.txt";
  link.click();
}

function applyTemplate() {
  let select = document.getElementById("templateSelect").value;
  let box = document.getElementById("templateBox");
  if (select === "invite") {
    box.value = "Hi, you're invited to join our platform!";
  } else if (select === "promo") {
    box.value = "Special promo just for you, don't miss out!";
  } else if (select === "reminder") {
    box.value = "This is a friendly reminder for your upcoming task.";
  } else {
    box.value = "";
  }
}

// Gmail Batcher
let batches = [];

function splitGmails() {
  let input = document.getElementById("gmailInput").value;
  let emails = input.split(/[\n, ]+/).filter(e => e.includes("@gmail.com"));
  let size = parseInt(document.getElementById("batchSize").value) || 100;

  batches = [];
  for (let i = 0; i < emails.length; i += size) {
    batches.push(emails.slice(i, i + size));
  }

  let out = batches.map((b, i) => `Batch ${i+1}:\n${b.join(", ")}\n`).join("\n");
  document.getElementById("batchOutput").innerText = out;
}

function copyBatch() {
  if (batches.length === 0) {
    alert("No batches available!");
    return;
  }
  navigator.clipboard.writeText(batches[0].join(", "));
  alert("First batch copied!");
}

function exportBatches() {
  if (batches.length === 0) {
    alert("No batches to export!");
    return;
  }
  let zipText = batches.map((b, i) => `Batch ${i+1}:\n${b.join(", ")}\n`).join("\n");
  let blob = new Blob([zipText], {type: "text/plain"});
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "gmail_batches.txt";
  link.click();
}

// Contact form
function sendMessage(event) {
  event.preventDefault();
  document.getElementById("contactStatus").innerText = "Message sent! (Demo only)";
}

// Send with Gmail
function sendWithGmail() {
  let recipients = document.getElementById("output").innerText.replace(/\n/g, ",");
  let subject = encodeURIComponent(document.getElementById("emailSubject").value);
  let message = encodeURIComponent(document.getElementById("emailMessage").value);

  if (!recipients) {
    alert("Please generate email list first!");
    return;
  }

  let gmailUrl = `https://mail.google.com/mail/?view=cm&to=${recipients}&su=${subject}&body=${message}`;
  window.open(gmailUrl, "_blank");
}
