// the client preferential commission rule (rule 2) states that clients may have
// preferential commissions in EUR
import { Client } from "../../client";

export const clientPreferentialCommissionRule = async ({
  client,
}: {
  client: Client;
}): Promise<number | null> => {
  if (client.preferentialComissionEur) {
    return client.preferentialComissionEur;
  }

  return null;
};
