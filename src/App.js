import { TextField , Button} from '@material-ui/core';
import './App.css';

function App() {
  return (
    <div className='center'>
        <h1>Form</h1>
        <TextField id="abc" className="abc" label="Email" /><br></br>
        <TextField id="standard-basic" className="abc" label="Password" /><br></br><br></br>
        <Button variant="contained" color="primary">Submit</Button>
    </div>
  );
}

export default App;
