import { deleteQuote, deleteQuotesByName } from '@/firebase/firestore';
import { quotesApi, isApiEnabled } from '@/lib/api';

/** Quote IDs to remove from admin views (test / stale data). */
const PURGE_IDS = ['QR-NN9XHLI'];

export async function purgeStaleQuotes(): Promise<void> {
  if (isApiEnabled) {
    await Promise.all(
      PURGE_IDS.map((id) => quotesApi.delete(id).catch(() => undefined)),
    );
    const all = await quotesApi.getAll();
    const marlon = all.filter((q) => q.name.trim().toLowerCase() === 'marlon');
    await Promise.all(marlon.map((q) => quotesApi.delete(q.id).catch(() => undefined)));
  } else {
    for (const id of PURGE_IDS) await deleteQuote(id);
    await deleteQuotesByName('Marlon');
  }
}
