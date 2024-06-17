import React from 'react';
import { Highlight } from 'rsuite';

const wordsWithColors: { [key: string]: string } = {
  'any': 'yellow',
  'success': '#99cc99',
  'failure': '#ff7f7f',
  'every': 'yellow',
};

const renderMark = (match: string, index: number) => {
  const color = wordsWithColors[match.toLowerCase()] || 'yellow'; // Default color if not specified
  return (
    <mark
      key={index}
      style={{
        backgroundColor: color,
        borderRadius: '4px', // Add border radius
        padding: '1px 3px', // Add padding to ensure text is not too close to the border
        cursor: 'pointer',
        opacity: 0.8, // Adjust opacity
        margin: '0 2px', // Adjust margins
      }}
    >
      {match}
    </mark>
  );
};

const CustomHighlight: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Highlight query={Object.keys(wordsWithColors)} renderMark={renderMark}>
      {text}
    </Highlight>
  );
};

export default CustomHighlight;
