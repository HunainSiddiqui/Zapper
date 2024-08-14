"use client";
import { Appbar } from "@/components/Appbar";
import { DarkButton } from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { LinkButton } from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa"; // Using FontAwesome for icons
import { Grids } from "@/components/ui/grids";

interface Zap {
  id: string;
  triggerId: string;
  userId: number;
  actions: {
    id: string;
    zapId: string;
    actionId: string;
    sortingOrder: number;
    type: {
      id: string;
      name: string;
      image: string;
    };
  }[];
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
      image: string;
    };
  };
}

function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setZaps(res.data.zaps);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    zaps,
  };
}

export default function Dashboard() {
  const { loading, zaps } = useZaps();
  const router = useRouter();

  return (
      <div className="min-h-screen bg-gray-100">
          
      <Appbar />
      <div className="container mx-auto pt-8">
        <div className="flex justify-between items-center mb-6 px-4">
          <h1 className="text-3xl font-bold font-serif text-gray-800">My Zaps</h1>
          <DarkButton
            onClick={() => {
              router.push("/zap/create");
            }}
          >
            Create New Zap
          </DarkButton>
        </div>
        {loading ? (
          <div className="flex justify-center pt-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zaps.map((zap) => (
              <ZapCard key={zap.id} zap={zap} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ZapCard({ zap }: { zap: Zap }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={zap.trigger.type.image}
            alt="Trigger"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              {zap.trigger.type.name}
            </h2>
            <p className="text-sm text-gray-500">{`ID: ${zap.id}`}</p>
          </div>
        </div>
        <div className="text-gray-400">
          <FaArrowRight />
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">Actions:</p>
        <div className="flex flex-wrap">
          {zap.actions.map((action) => (
            <img
              key={action.id}
              src={action.type.image}
              alt="Action"
              className="w-8 h-8 rounded-full border-2 border-gray-200 mr-2 mb-2"
            />
          ))}
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-4">
        <p>{`Created on: Nov 13, 2023`}</p>
        <p className="truncate">{`Webhook URL: ${HOOKS_URL}/hooks/catch/1/${zap.id}`}</p>
      </div>
      <div className="flex justify-end">
        <LinkButton
          onClick={() => router.push(`${HOOKS_URL}/hooks/catch/1/${zap.id}`)}
         
        >
          Go <FaArrowRight className="ml-2" />
        </LinkButton>
      </div>
    </div>
  );
}
