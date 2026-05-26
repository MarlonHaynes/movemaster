/**
 * Remove a quote/job and related invoice + transactions from ./data JSON files.
 * Usage: node scripts/purge-quote.mjs QR-NN9XHLI
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const id = process.argv[2];
if (!id) {
  console.error('Usage: node scripts/purge-quote.mjs <quote-id>');
  process.exit(1);
}

const dataDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../data');

function read(name) {
  const fp = path.join(dataDir, `${name}.json`);
  if (!fs.existsSync(fp)) return [];
  return JSON.parse(fs.readFileSync(fp, 'utf8'));
}

function write(name, data) {
  fs.writeFileSync(path.join(dataDir, `${name}.json`), JSON.stringify(data, null, 2), 'utf8');
}

const jobs = read('jobs');
const jobsNext = jobs.filter((j) => j.id !== id);
const jobsRemoved = jobs.length - jobsNext.length;
write('jobs', jobsNext);

const invoices = read('invoices');
const invoicesNext = invoices.filter((i) => i.jobId !== id && i.id !== `inv-${id}`);
write('invoices', invoicesNext);

const txns = read('transactions');
const txnsNext = txns.filter((t) => t.jobId !== id);
write('transactions', txnsNext);

console.log(`Purged ${id}: ${jobsRemoved} job(s), ${invoices.length - invoicesNext.length} invoice(s), ${txns.length - txnsNext.length} transaction(s)`);
