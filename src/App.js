import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import Cards from './components/Cards';
import Spinner from './components/Spinner';
import { filterData,apiUrl } from './data';
import { toast } from 'react-toastify';
function App() {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);
  async function fetchData() {
    setLoading(true);
    try {
      let response = await fetch(apiUrl);
      let output = await response.json();
      setCourses(output.data);
      
    }
    catch(error) {
      toast.error("Network Error");
    }
    setLoading(false);
  }
  
  useEffect(() => {
    fetchData();
  },[])
  
  return (
    <div className='min-h-screen flex flex-col bg-slate-800'>
      <div>
      <Navbar/>
      </div>
      <div className='bg-slate-800'>
        <div>
          <Filter filterData={filterData} setCategory={setCategory } category={category} />
        </div>
        <div className='w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]'>
          { loading ? (<Spinner />) : (<Cards courses={courses} category={category} />)}
        </div>
      </div>
      
    </div>
  );
}

export default App;
