import { CollectionReference } from "firebase/firestore";
import { SITE_COLLECTION } from "../../config";
import { firestore } from "../../firebase/app";
import {
  getFirstoreColection,
  getFirstoreDocs,
} from "../../firebase/firestore";

export default class SiteApi {
  private colectionRef: CollectionReference;

  constructor(colectionRef = getFirstoreColection(firestore, SITE_COLLECTION)) {
    this.colectionRef = colectionRef;
  }
  getSiteSettings = async () => {
    const res = await getFirstoreDocs(this.colectionRef, []);

    return res.empty
      ? []
      : res.docs.map((e) => {
          return {
            ...e.data(),
            id: e.id,
          };
        });
  };
}
