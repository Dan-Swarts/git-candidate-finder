import './tableEntry.css';
import Candidate from '../interfaces/Candidate.interface';

interface SavedCandidateProps{
    candidate: Candidate;
    color: string;
    setSavedCandidates: any;
    savedCandidates: Candidate[];
}

const TableEntry = ({ candidate, color, setSavedCandidates, savedCandidates, } : SavedCandidateProps) => {

    const handleRejection = () => {
        const newCandidatesList = savedCandidates.filter((candidateObject) => {
            return candidateObject.id !== candidate.id;
        });

        setSavedCandidates(newCandidatesList);

        localStorage.setItem('savedCandidates',JSON.stringify(newCandidatesList))
    }

    return (
        <>
            <div className={`entry entry-${color}`}>
                <img src={candidate.avatar_url} alt="" />
                <p>{candidate.login}</p>
                <p>{candidate.location}</p>
                <p>{candidate.email}</p>
                <p>{candidate.company}</p>
                <p>{candidate.bio}</p>
                <div>
                    <button onClick={handleRejection} className='rejectButton'>➖</button>
                </div>
            </div>
        </>
    )

}

export default TableEntry;