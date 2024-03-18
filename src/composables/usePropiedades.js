import { ref, computed } from "vue";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";

export default function usePropiedades() {
  const piscina = ref(false);

  const storage = useFirebaseStorage();
  const db = useFirestore();
  const propiedadesCollection = useCollection(collection(db, "propiedades"));

  async function deleteItem(id, urlImage) {
    if (confirm("¿Deseas eliminar esta propiedad?")) {
      const docRef = doc(db, "propiedades", id);
      const imageRef = storageRef(storage, urlImage);

      //Estas dos peticiones se ejecutan a la vez
      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)]);
    }
  }

  const filteredItems = computed(() => {
    return piscina.value
      ? propiedadesCollection.value.filter((p) => p.piscina)
      : propiedadesCollection.value;
  });
  return {
    piscina,
    propiedadesCollection,
    filteredItems,
    deleteItem,
  };
}
