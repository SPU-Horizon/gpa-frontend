import React, { ChangeEvent } from 'react';

interface ImportTranscriptProps {
  onTranscriptUploaded: (file: File) => void;
}

const ImportTranscript: React.FC<ImportTranscriptProps> = ({ onTranscriptUploaded }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      onTranscriptUploaded(file);
    }
  };

  return (
    <div className="import-transcript-container">
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default ImportTranscript;
