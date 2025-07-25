import {useState, useEffect} from "react"
import { currentUser as fclCurrentUser } from "@onflow/fcl"

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => fclCurrentUser().subscribe(setCurrentUser), [])
  return currentUser
}
