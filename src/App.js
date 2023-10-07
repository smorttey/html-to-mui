// Import necessary libraries and components
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// Main component
function App() {
  const [inputHtml, setInputHtml] = useState('');
  const [outputCode, setOutputCode] = useState('');

  // Handler to convert HTML to Material-UI Typography code
  const handleConvert = () => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(inputHtml, 'text/html');
    const elements = htmlDoc.body.childNodes;
    let muiCode = '';
    
    const processElement = (element) => {
      if (element.nodeType === 3) {  // Text node
        muiCode += `<Typography variant="body1">${element.nodeValue}</Typography>\n`;
      } else if (element.tagName) {
        switch (element.tagName.toLowerCase()) {
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            const variant = element.tagName.toLowerCase();
            muiCode += `<Typography variant="${variant}">${element.innerHTML}</Typography>\n`;
            break;
          case 'p':
            muiCode += `<Typography variant="body1">${element.innerHTML}</Typography>\n`;
            break;
          case 'ul':
          case 'ol':
            muiCode += `<List>\n`;
            Array.from(element.children).forEach(child => processElement(child));
            muiCode += `</List>\n`;
            break;
          case 'li':
            muiCode += `<ListItem>${element.innerHTML}</ListItem>\n`;
            break;
          default:
            muiCode += element.outerHTML + '\n';  // Keep the original HTML for other elements
            break;
        }
      }
    };

    elements.forEach(element => processElement(element));
    setOutputCode(muiCode);
  };

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        label="Input HTML"
        multiline
        rows={10}
        variant="outlined"
        fullWidth
        value={inputHtml}
        onChange={(e) => setInputHtml(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleConvert} style={{ margin: '20px 0' }}>
        Convert
      </Button>
      <TextField
        label="Output Material-UI Code"
        multiline
        rows={10}
        variant="outlined"
        fullWidth
        value={outputCode}
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
}

export default App;
