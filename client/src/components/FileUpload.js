// import React, { useState } from 'react';
// import axios from "axios";
// import "./FileUpload.css";

// const FileUpload = ({ accounts, provider, contracts }) => {
//     const [file,setFile] = useState(null);
//     const [fileName,setfileName] = useState("No File Selected");
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (file) {
//           try {
//             const formData = new FormData();
//             formData.append("file", file);

//             const resFile = await axios({
//               method: "post",
//               url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//               data: formData,
//               headers: {
//                 pinata_api_key: `4d25b17c2a9a77f3e1ec`,
//                 pinata_secret_api_key: `ce548c1953df25cc4f6320b9149d781cd1d9011d6acddaa9cbce7b0ee5a19d6c`,
//                 "Content-Type": "multipart/form-data",
//               },
//             });
//             const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
//             contracts.add(accounts,ImgHash);
//             alert("Successfully Image Uploaded");
//             setfileName("No image selected");
//             setFile(null);
//           } catch (e) {
//             alert("Unable to upload image to Pinata");
//           }
//         }
//         alert("Successfully Image Uploaded");
//         setfileName("No image selected");
//         setFile(null);
//       };

//     const retrieveFile = (e) => {
//         // Function to retrieve file
//         const data = e.target.files[0];
//         // console.log(data);
//         const reader = new window.FileReader();
//         reader.readAsArrayBuffer(data);
//         reader.onloadend=()=>{
//             setFile(e.target.files[0]);
//         }
//         setfileName(e.target.files[0].name);
//         e.preventDefault();
//     };

//     // Check if provider is null
//     if (!provider) {
//         return <div>Error: Missing provider</div>;
//     }

//     return (
//         <div className="top">
//             <form className="form" onSubmit={handleSubmit}>
//                 <label htmlFor="file-upload" className="choose">
//                     Choose File
//                 </label>
//                 <input disabled={!accounts} type="file" id="file-upload" name="data" onChange={retrieveFile} />
//                 <span className="textArea">File Name : {fileName}</span>
//                 <button type="submit" className="upload" disabled={!file}>Submit</button>
//             </form>
//         </div>
//     );
// };

// export default FileUpload;

import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import { Upload } from "lucide-react";
import { DNA } from "react-loader-spinner";

const FileUpload = ({ contracts, accounts, providers }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [startedUpload, setStartedUpload] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStartedUpload(true); // Show spinner

    setTimeout(async () => {
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `4d25b17c2a9a77f3e1ec`,
              pinata_secret_api_key: `ce548c1953df25cc4f6320b9149d781cd1d9011d6acddaa9cbce7b0ee5a19d6c`,
              "Content-Type": "multipart/form-data",
            },
          });
          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          contracts.add(accounts, ImgHash);
          await contracts.display(accounts);

          setFileName("No image selected");
          setFile(null);
          alert("Successfully Image Uploaded");
        } catch (e) {
          alert("Unable to upload image to Pinata");
        } finally {
          setStartedUpload(false); // Hide spinner after upload completes
        }
      }
    }, 1500);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="top">
      <form className="form flex-center gap-32" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="file-upload" className="choose text-xl">
            Choose Image
          </label>
          <input
            disabled={!accounts}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
            className="text-slate-400 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-400">
            {fileName.substring(0, 30)} ...
          </span>
          <button
            type="submit"
            className={`upload flex-center ${
              startedUpload ? "bg-black border-slate-600" : "bg-blue-500"
            } border-2 border-blue-500 hover:text-blue-400 hover:bg-transparent hover:cursor-pointer px-2.5 py-2 rounded-md hover:-translate-y-1 transition-transform hover:scale-105`}
            disabled={!file}
          >
            {startedUpload ? (
              <DNA visible={true} height={50} width={50} />
            ) : (
              <Upload />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default FileUpload;

// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";
// function FileUpload({ contracts, provider, accounts }) {
//   // const [urlArr, setUrlArr] = useState([]);
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (file) {
//         try {
//           const formData = new FormData();
//           formData.append("file", file);

//           const resFile = await axios({
//             method: "post",
//             url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//             data: formData,
//             headers: {
//               pinata_api_key: `95f328a012f1634eab8b`,
//               pinata_secret_api_key: `8ea64e6b39c91631c66128a7c0e0dde35a6fbdf797a8393cc5ba8bf8d58e9b54`,
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
//           const signer = contracts.connect(provider.getSigner());
//           signer.add(accounts, ImgHash);

//           //setUrlArr((prev) => [...prev, ImgHash]);

//           //Take a look at your Pinata Pinned section, you will see a new file added to you list.
//         } catch (error) {
//           alert("Error sending File to IPFS");
//           console.log(error);
//         }
//       }

//       alert("Successfully Uploaded");
//       setFileName("No image selected");
//       setFile(null); //to again disable the upload button after upload
//     } catch (error) {
//       console.log(error.message); //this mostly occurse when net is not working
//     }
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0];
//     console.log(data);

//     const reader = new window.FileReader();

//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           {/*turn around for avoding choose file */}
//           Choose Image
//         </label>
//         <input
//           disabled={!accounts} //disabling button when metamask accounts is not connected
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         {/* choose file */}
//         <button type="submit" disabled={!file} className="upload">
//           Upload file
//         </button>
//       </form>
//     </div>
//   );
// }

// export default FileUpload;
