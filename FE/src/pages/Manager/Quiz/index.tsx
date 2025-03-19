import QuizManager from "../../../components/QuizManager";
import ManagerTabs from "../../../components/TabsManager";

const Quiz = () => {
  return (
    <div className="container mx-auto">
      {/* Add Manager Tabs at the top */}
      <h1 className="text-2xl font-bold mt-10">Services</h1>
      <ManagerTabs />

      <div className="w-[90%] mx-auto mt-5 flex justify-end"></div>
      <div className="w-[90%] mx-auto mt-10"></div>
      <div>
        <QuizManager />
      </div>
    </div>
  );
};

export default Quiz;
