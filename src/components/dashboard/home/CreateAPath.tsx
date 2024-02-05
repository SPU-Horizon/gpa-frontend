import React, { useState, ChangeEvent, FormEvent } from 'react';

interface PathDetails {
  // Define the properties of your path details here
  // For example:
  course: string;
  // Add more properties as needed
}

interface CreatePathProps {
  onSavePath: (pathDetails: PathDetails) => void;
}

const CreatePath: React.FC<CreatePathProps> = ({ onSavePath }) => {
  const [pathDetails, setPathDetails] = useState<PathDetails>({ course: '' /* default values */ });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPathDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSavePath(pathDetails);
    // Additional logic after save
  };

  return (
    <div className="create-path-container">
      <form onSubmit={handleSubmit}>
        {/* Form fields go here */}
        <input
          name="course"
          value={pathDetails.course}
          onChange={handleInputChange}
          // Add more input fields as needed
        />
        <button type="submit">Save Path</button>
      </form>
    </div>
  );
};

export default CreatePath;
