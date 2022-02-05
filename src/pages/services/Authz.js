import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import {
  Input,
  Button,
  Box,
  Text,
  VStack,
  Center,
  Textarea,
  Heading,
} from "@chakra-ui/react"
import {useToast} from "@chakra-ui/toast"
import {Flex, Spacer} from "@chakra-ui/layout"
import Transaction from "../../components/Transaction"
import Layout from "../../components/Layout"
import Title from "../../components/Title"
import {keyVault} from "../../lib/keyVault"
import {createSignature} from "../../controllers/authz"
import {useTransaction} from "../../contexts/TransactionContext"
import * as styles from "../../styles"

export default function Authz() {
  const [opener, setOpener] = useState(null)
  const [signable, setSignable] = useState(null)
  const [unlocked, setUnlocked] = useState(keyVault.unlocked)
  const [transactionCode, setTransactionCode] = useState(``)
  const [showTransactionCode, setShowTransactionCode] = useState(false)
  const [description, setDescription] = useState(
    "This transaction has not been audited."
  )
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const [txResult, setTxResult] = useState(null)
  const {initTransactionState, setTxId, setTransactionStatus} = useTransaction()
  const toast = useToast()

  const website = "https://flow.com" // need to get from fcl/contentScript

  function fclCallback(data) {
    if (typeof data != "object") return
    if (data.type !== "FCL:VIEW:READY:RESPONSE") return
    const signable = data.body
    if (signable.cadence) {
      setTransactionCode(signable.cadence)
    }
    setSignable(signable)
  }

  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: false,
        },
        tabs => {
          setOpener(tabs[0].id)
          chrome.tabs.sendMessage(tabs[0].id || 0, {type: "FCL:VIEW:READY"})
        }
      )

    const messagesFromReactAppListener = (msg, sender, sendResponse) => {
      if (msg.type === "FCL:VIEW:READY:RESPONSE") {
        fclCallback(JSON.parse(JSON.stringify(msg || {})))
      }

      if (msg.type === "FLOW::TX") {
        setTxId(msg.txId)
        fcl.tx(msg.txId).subscribe(txStatus => {
          setTransactionStatus(txStatus.status)
          if (txStatus.status === 4) {
            setTxResult(txStatus.statusString)
          }
          console.log("TX:STATUS", msg.txId, txStatus)
        })
      }
    }

    chrome.runtime?.onMessage.addListener(messagesFromReactAppListener)
  }, [])

  async function submitPassword() {
    setLoading(true)
    try {
      await keyVault.unlockVault(password)
      setUnlocked(true)
    } catch (e) {
      toast({
        description: "Invalid password",
        status: "error",
        duration: styles.toastDuration,
        isClosable: true,
      })
    }
    setLoading(false)
  }

  async function sendAuthzToFCL() {
    initTransactionState()

    setLoading(true)
    const signedMessage = await createSignature(
      signable.message,
      signable.addr,
      signable.keyId
    )

    chrome.tabs.sendMessage(parseInt(opener), {
      f_type: "PollingResponse",
      f_vsn: "1.0.0",
      status: "APPROVED",
      reason: null,
      data: new fcl.WalletUtils.CompositeSignature(
        signable.addr,
        signable.keyId,
        signedMessage
      ),
    })
    // setLoading(false)
    // window.close()
  }

  function sendCancelToFCL() {
    chrome.tabs.sendMessage(parseInt(opener), {type: "FCL:VIEW:CLOSE"})
    window.close()
  }

  const TxResult = () => {
    return (
      <VStack spacing={4} align='stretch'>
        <Title align='center'>Transaction Confirmed</Title>
        <Box p={5} shadow='md' borderWidth='1px'>
          <Heading fontSize='xl'> {txResult}</Heading>
          <Text mt={4}>"Your transaction was successful..."</Text>
        </Box>
        <Box>
          <Button
            onClick={() => window.close()}
            textAlign='center'
            mt='4'
            bg={styles.tertiaryColor}
            mx='auto'
            mr='16px'
            maxW='150px'
          >
            Close
          </Button>
        </Box>
      </VStack>
    )
  }

  return (
    <Layout withGoBack={false}>
      {!unlocked ? (
        <>
          <Title>Unlock your wallet to confirm the transaction</Title>
          <Flex>
            <Spacer />
            <Input
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              mx='auto'
              maxW='220px'
              p='2'
              mt='24'
              placeholder='Password'
            ></Input>
            <Spacer />
          </Flex>

          <Flex>
            <Spacer />
            <Button
              onClick={submitPassword}
              textAlign='center'
              mt='4'
              bg={styles.primaryColor}
              color={styles.whiteColor}
              mx='auto'
              maxW='150px'
            >
              Continue
            </Button>
            <Spacer />
          </Flex>
        </>
      ) : (
        <>
          {!loading && !txResult ? (
            <>
              <Title align='center'>Confirm Transaction</Title>
              <Box mx='auto' w='280px'>
                <Text
                  mt='32px'
                  fontWeight='bold'
                  fontSize='20px'
                  color={"white"}
                >
                  {website}
                </Text>
                <br />
                <Text fontSize='18px' mt='12px'>
                  Estimated Fees
                </Text>
                <VStack
                  mt='8px'
                  p='12px'
                  borderTopWidth='3px'
                  borderBottomWidth='3px'
                  borderColor='gray.500'
                >
                  <Center>
                    <Text
                      align='center'
                      color='gray.100'
                      textAlign='center'
                      fontWeight='medium'
                      fontSize='16px'
                    >
                      Flow ₣0.0001
                    </Text>
                  </Center>
                </VStack>
                <br />
                <Text fontSize='18px' mt='12px'>
                  Transaction
                </Text>
                <Text> {description} </Text>
                <VStack
                  mt='4px'
                  p='12px'
                  borderTopWidth='3px'
                  borderBottomWidth='3px'
                  borderColor='gray.500'
                >
                  <Center>
                    <Text
                      align='center'
                      color='gray.100'
                      textAlign='center'
                      fontWeight='medium'
                      fontSize='16px'
                      textDecoration='underline'
                      cursor='pointer'
                      onClick={() => {
                        setShowTransactionCode(!showTransactionCode)
                      }}
                    >
                      {!showTransactionCode
                        ? `View Transaction Code`
                        : `Hide Transaction Code`}
                    </Text>
                  </Center>
                  {showTransactionCode ? (
                    <>
                      <Textarea
                        readOnly='true'
                        isReadOnly='true'
                        value={transactionCode}
                        w='100%'
                        fontSize='11px'
                      ></Textarea>
                    </>
                  ) : null}
                </VStack>
              </Box>
            </>
          ) : (
            <Flex
              direction='col'
              w='100%'
              h='100%'
              align='center'
              justify='center'
            >
              {!txResult ? <Transaction /> : <TxResult />}
            </Flex>
          )}
          <Spacer />
          {!txResult && (
            <Flex>
              <Spacer />
              <Button
                onClick={sendCancelToFCL}
                textAlign='center'
                mt='4'
                bg={styles.tertiaryColor}
                mx='auto'
                mr='16px'
                maxW='150px'
              >
                Cancel
              </Button>
              <Button
                onClick={sendAuthzToFCL}
                textAlign='center'
                mt='4'
                bg={styles.primaryColor}
                color={styles.whiteColor}
                mx='auto'
                maxW='150px'
                isLoading={loading}
              >
                Confirm
              </Button>
            </Flex>
          )}
        </>
      )}
    </Layout>
  )
}
