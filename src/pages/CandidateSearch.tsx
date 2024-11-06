import { useState, useEffect, } from 'react';
import { searchGithub, searchGithubUser, } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import './candidateSearch.css'


const CandidateSearch = () => {
  const [currentCandidate,setCurrentCandidate] = useState<Candidate>({} as Candidate);
  const [candidateLogins,setCandidateLogins] = useState<string[]>([] as string[]);
  const [index,setIndex] = useState<number>(0)


  useEffect(() => {
    handleGitApiCall();
  }, []);

  const handleGitApiCall = async() => {
    const candidateData = await searchGithub();

    const logins = candidateData.map((data: any) => {
      return data.login;
    });

    setCandidateLogins(logins);
    const firstCandidate: Candidate = await searchGithubUser(logins[index]);
    setCurrentCandidate(firstCandidate);
  }

  const switchToNextCandidate = async() => {
    setIndex(index + 1);
    if(index >= candidateLogins.length){
      alert("No more candidates!");
      return;
    }
    setCurrentCandidate(await searchGithubUser(candidateLogins[index]));
  }

  const saveCandidateToLocalStorage = () => {
    let savedCandidates: string | null = localStorage.getItem('savedCandidates');
    let parsedCandidates: Candidate[] | null = null;

    if(savedCandidates){
      parsedCandidates = JSON.parse(savedCandidates);
    }

    if (parsedCandidates){
      parsedCandidates = parsedCandidates.filter((paredCandidate) => {
        return paredCandidate.id !== currentCandidate.id;
      });
    }

    parsedCandidates 
      ? savedCandidates = JSON.stringify([...parsedCandidates, currentCandidate])
      : savedCandidates = JSON.stringify([currentCandidate]);

    localStorage.setItem('savedCandidates',savedCandidates);

    switchToNextCandidate();
  }

  return (
    <>
      <h1 className='candidateTile'>CandidateSearch</h1>
      {currentCandidate.login 
        ? <div className='CandidateCard'>
            <h2 className='CandidateName'>{currentCandidate.login}</h2>
            <img src={currentCandidate.avatar_url} alt="a random GitHub users's profile picture" className='CandidatePicture'/>
            <p className='CandidateLocation'>{`Location: ${currentCandidate.location}`}</p>
            <p className='CandidateEmail'>{`email: ${currentCandidate.email}`}</p>
            <p className='CandidateCompany'>{`company: ${currentCandidate.company}`}</p>
            <p className='CandidateBio'>{`Bio: ${currentCandidate.bio}`}</p>
          </div> 
        : <p>404...Candidate not found. Click the + or - button to go to the next candidate.</p>
      }

      <div className='buttonsContainer'>
        <button onClick={switchToNextCandidate} className='searchButton'>
          ➖
        </button>

        <button onClick={saveCandidateToLocalStorage} className='saveButton'>
          ➕
        </button>
      </div>
    </>
  );
};

export default CandidateSearch;
