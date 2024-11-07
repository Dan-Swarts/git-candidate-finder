import './savedCandidate.css';
import Candidate from '../interfaces/Candidate.interface';
import TableEntry from '../components/TableEntry'
import { useEffect, useState } from 'react';


const SavedCandidates = () => {
  const [savedCandidates,setSavedCandidates] = useState<Candidate[]>([{}] as Candidate[]);
  
  useEffect(() => {
    initialRender();
  },[]);

  const initialRender = () => {
    let savedCandidates: string | null = localStorage.getItem('savedCandidates');
    let parsedCandidates: Candidate[] | null = null;

    if(savedCandidates){
      parsedCandidates = JSON.parse(savedCandidates);
    }

    if(parsedCandidates){
      setSavedCandidates(parsedCandidates);
    }
  }

  return (
    <>
      <h1>Potential Candidates</h1>

      {savedCandidates[0] 
        ? <>
            <header className='tableHeader'>
              <p>image</p>
              <p>Name</p>
              <p>Location</p>
              <p>Email</p>
              <p>Company</p>
              <p>Bio</p>
              <p>Reject</p>
            </header>
            
            {savedCandidates.map((candidate, index) => {
              return (<TableEntry 
                candidate = { candidate }
                color = { index % 2 ? 'black' : 'grey' }
                setSavedCandidates = {setSavedCandidates}
                savedCandidates = {savedCandidates}
              />)
            })}
          </>
        : <p>no potential candidates</p>
      }
        
    </>
  );
};

export default SavedCandidates;
