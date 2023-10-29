import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Layout } from "../components/organism/Layout";
import {
  Input,
} from "@chakra-ui/react";
import { Jar } from "../components/atom/Jar";

export function HomeScreen() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [size, setsize] = useState(200);
  const [percentage, setPercentage] = useState(50);
  const [time, setTime] = useState(99);

  // useEffect(() => {
  //   setInterval(() => setsize(((old)=>old+0.5)), 2000)
  // }, [])

  return (
    <Layout isPublic>
      <div className="flex flex-col gap-5">
        <Input
          type="number"
          value={size}
          onChange={(e) => setsize(Number(e.target.value))}
        ></Input>
        <Input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
        ></Input>

        <Input
          type="number"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        ></Input>

        <Jar size={size} time={time}  />
      </div>
    </Layout>
  );
}
