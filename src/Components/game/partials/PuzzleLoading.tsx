import { FiRotateCw as IconLoading } from 'react-icons/fi';
import { messages } from 'Utils/constants';


function PuzzleLoading(): JSX.Element {
  return (
    <div className="puzzle puzzle-loading">
      <IconLoading className="icon loading-icon" />
      <p className="message loading-message">{messages.text.loading}</p>
    </div>
  );
}

export default PuzzleLoading;
