import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";

function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [modal, setModal] = useState(false);

  const options = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 700,
        },
      },
      color: {
        value: ["#2EB67D", "#ECB22E", "#E01E5B", "#b83df6"],
      },
      shape: {
        type: "triangle",
      },
      opacity: {
        value: 1,
      },
      size: {
        value: { min: 1, max: 5 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#c6c4c7",
        opacity: 0.25,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: "out",
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
  };

  const particlesInit = useCallback(async (main) => {
    console.log(main);
    // Custom particles settings
    await loadFull(main); // Load full tsparticles package
  }, []); // Used useCallback to optimize rendering

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            setAccount("");
          }
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
      <div className="App bg-slate-900 h-screen w-screen text-white">
        <Particles options={options} init={particlesInit} />
        <div className="flex items-center justify-evenly w-full h-full flex-col">
          <div className="flex-center flex-col gap-1">
            <h1 className="lg:text-7xl border-b-2 border-b-slate-600 pb-0.5 bg-gradient-to-tr from-fuchsia-500 via-green-400 to-fuchsia-500 bg-clip-text text-transparent w-fit">
              De-Share
            </h1>
            <p className="text-slate-400 text-sm">
              A decentralized image sharing platform
            </p>
          </div>
          <div className="border-2 lg:rounded-lg p-5 bg-slate-800 border-slate-700 shadow-xl shadow-black flex flex-col">
            <p className="text-3xl flex flex-col w-full gap-4">
              <span className="border-b-2 border-b-slate-700 pb-1">
                Account
              </span>
              <span className="bg-gradient-to-br from-purple-500 from-20% via-orange-500 to-purple-500 bg-clip-text text-transparent w-fit">
                {account ? account : "Not Connected"}
              </span>
            </p>
          </div>
          <FileUpload
            accounts={account}
            providers={provider}
            contracts={contract}
          />
          <Display contracts={contract} accounts={account} />
        </div>
      </div>
    </>
  );
}

export default App;
