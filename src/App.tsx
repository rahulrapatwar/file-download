import { FileTable } from "./components/FileTable";
import { data } from "./data/file";

const App: React.FC = () => {
  return (
    <div className="p-8 text-[#3B3939]">
      <FileTable data={data} />
    </div>
  );
};

export default App;
