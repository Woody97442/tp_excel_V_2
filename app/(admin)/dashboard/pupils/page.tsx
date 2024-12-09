import PupilsContent from "@/components/page/pupils-content";
import { getPupils } from "@/data/pupil";

const Clients = async () => {
  const pupils = await getPupils();
  return <PupilsContent allPupils={pupils}></PupilsContent>;
};

export default Clients;
