/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type helpers_auctionResultHelpers = {
    readonly currency: string | null;
    readonly boughtIn: boolean | null;
    readonly priceRealized: {
        readonly display: string | null;
        readonly cents: number | null;
    } | null;
    readonly saleDate: string | null;
    readonly " $refType": "helpers_auctionResultHelpers";
};
export type helpers_auctionResultHelpers$data = helpers_auctionResultHelpers;
export type helpers_auctionResultHelpers$key = {
    readonly " $data"?: helpers_auctionResultHelpers$data;
    readonly " $fragmentRefs": FragmentRefs<"helpers_auctionResultHelpers">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "helpers_auctionResultHelpers",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currency",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "boughtIn",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionResultPriceRealized",
      "kind": "LinkedField",
      "name": "priceRealized",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "display",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cents",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleDate",
      "storageKey": null
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};
(node as any).hash = 'db95400fef1900bae92bf9f0910d5a80';
export default node;
