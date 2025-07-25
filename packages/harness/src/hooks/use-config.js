import {useState, useEffect} from "react"
import { config as fclConfig } from "@onflow/fcl"

export default function useConfig() {
  const [config, setConfig] = useState(null)
  useEffect(() => fclConfig().subscribe(setConfig), [])
  return config
}
