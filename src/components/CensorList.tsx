import { Badge, Box, Button, Card, Flex, Grid, Link, Progress, Text, TextField } from '@radix-ui/themes';
import { Dialog, Menubar, RadioGroup } from "radix-ui";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import "../styles.css";
import React from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import ClaimPage from './ClaimPage';
import History from './History';

enum CensorStatusEnum {
  NONE,
  STAKING,
  VOTING,
  CLOSED,
}

enum RuleModeEnum {
  NONE,
  CONTAIN,
  MATCH,
  MATCH_STRICT,
}

const GUARANTEE_STAKING = 2;
const CHALLENGE_STAKING = 3;
const VOTING = 4;
const CLOSED = 5;

const censorContent: CensorContent[] = [
  { id: '1', title: 'A Brief History of Memecoins: Their Past and Future', author: '1kx', url:'https://mirror.xyz/0x91e2E2D26076C8A1EaDb69273605c16ef01928ce/RgbEQvn1vgfzrE6GDTwk3rrNYQmyuwVgejtR0-6okRc', project: 'Mirror', homepage: 'https://mirror.xyz', status: 2, statusName: 'Guarantee Staking', result: 0, voteRate: 0, rule: '', ruleMode: 0, isGuaranteeStaked: false, isChallengeStaked: false, isVoted: false },
  { id: '2', title: 'Governance Decides Where Ethereum Transacts: The L2 Governance Race', author: 'tally.xyz', url:'https://tally.mirror.xyz/QZNVKjupNZmSUsY9R2sV5_vA-qe1fsCMW2hlnZ-5lEg', project: 'Mirror', homepage: 'https://mirror.xyz', status: 2, statusName: 'Guarantee Staking', result: 0, voteRate: 0, rule: '', ruleMode: 0, isGuaranteeStaked: true, isChallengeStaked: false, isVoted: false },
  { id: '3', title: 'Making Sense of DAOs: Frameworks to Make Your DAO Contribution Journey Easier', author: 'tally.xyz', url:'https://tally.mirror.xyz/E5Htgo-pee_6XA22zAqL6PxbwWm0NVLuwqy3ljUgts4', project: 'Mirror', homepage: 'https://mirror.xyz', status: 3, statusName: 'Challenge Staking', result: 0, voteRate: 0, rule: '', ruleMode: 0, isGuaranteeStaked: false, isChallengeStaked: false, isVoted: false },
  { id: '4', title: 'Ethnographic Insights on Point Systems', author: 'fil', url:'https://mirror.xyz/filarm.eth/xR1zm05c15iUCTjlaFfxezPPZLQnL8PLzNwwpizdRN4', project: 'Mirror', homepage: 'https://mirror.xyz', status: 3, statusName: 'Challenge Staking', result: 0, voteRate: 0, rule: '', ruleMode: 0, isGuaranteeStaked: false, isChallengeStaked: true, isVoted: false },
  { id: '5', title: 'Why Your Friends and Family Won’t Talk About Bitcoin During the Holidays', author: 'Mark Helfman', url:'https://medium.com/thecapital/why-your-friends-and-family-wont-talk-about-bitcoin-during-the-holidays-c1ce7ebdbdf5', project: 'Medium', homepage: 'https://medium.com', status: 4, statusName: 'Voting', result: 0, voteRate: 20, rule: 'abcd', ruleMode: 3, isGuaranteeStaked: false, isChallengeStaked: false, isVoted: false },
  { id: '6', title: 'Valuation for Ethereum Optimistic Rollups', author: 'fil', url:'https://mirror.xyz/filarm.eth/e5z62ePirMcG2_V3b_KmzWy580hdziAwCoTQME3YsnI', project: 'Mirror', homepage: 'https://mirror.xyz', status: 5, statusName: 'Closed', result: 1, voteRate: 60, rule: '', ruleMode: 0, isGuaranteeStaked: false, isChallengeStaked: false, isVoted: false },
  { id: '7', title: '"the updates" ENE', author: 'Xcelencia', url:'https://xcelencia.mirror.xyz/r-OpUyTva99lwRCILVFfesMhwdQqu80754QtA2nVYpI', project: 'Mirror', homepage: 'https://mirror.xyz', status: 5, statusName: 'Closed', result: 0, voteRate: 35, rule: '', ruleMode: 0, isGuaranteeStaked: false, isChallengeStaked: false, isVoted: false },
  { id: '8', title: 'I am a professional trader and I will teach you how to make money in one article (not clickbait)', author: 'Paul Lenosky', url:'https://medium.com/@paullenosky/i-am-a-professional-trader-and-i-will-teach-you-how-to-make-money-in-one-article-not-clickbait-e4f43ccbb85d', project: 'Medium', homepage: 'https://medium.com', status: 4, statusName: 'Voting', result: 0, voteRate: 70, rule: 'a', ruleMode: 3, isGuaranteeStaked: false, isChallengeStaked: false, isVoted: true },
  { id: '9', title: 'The Many Rewards of Curiosity', author: 'rileybeans', url:'https://rileybeans.mirror.xyz/fHjegXov64dNA87wD8JdAjp6DoxtNYqMR9RywLX4QTo', project: 'Mirror', homepage: 'https://mirror.xyz', status: 4, statusName: 'Voting', result: 0, voteRate: 51, rule: 'e', ruleMode: 3, isGuaranteeStaked: false, isChallengeStaked: false, isVoted: false },
];

type CensorContent =  {
  id: string,
  title: string,
  author: string,
  url: string,
  project: string,
  homepage: string,
  status: number,
  statusName: string,
  result: number,
  voteRate: number,
  rule: string,
  ruleMode: number,
  isGuaranteeStaked: boolean,
  isChallengeStaked: boolean,
  isVoted: boolean,
}

const CensorList = () => {

  const menuItems = ["All", "Staking", "Voting", "Closed", "Search", "Claims", "History", "", ""];
  const statusEnums = [CensorStatusEnum.NONE, CensorStatusEnum.STAKING, CensorStatusEnum.VOTING, CensorStatusEnum.CLOSED];
  const [menuSelect, setMenuSelect] = React.useState<number>(0);
  const [menuItemSelect, setMenuItemSelect] = React.useState<string>("");
  const handleMenuSelect = (index: number, item: string) => {
    setMenuSelect(index);
    setMenuItemSelect(item);
  }
  return (
    <>
      <Menubar.Root className="MenubarRoot">
        <Menubar.Menu>
          {menuItems.map((item, index) => (
            item === "Search" ?
              <Menubar.Trigger
                key={index}
                style={{ cursor: "pointer", width: '35%'}}
                asChild
              >
                <TextField.Root placeholder="Search ">
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Menubar.Trigger>
            :
              <Menubar.Trigger
                key={index}
                onClick={() => handleMenuSelect(index, item)}
                className={`MenubarTrigger ${menuSelect === index ? "active" : ""}`}
                style={{ cursor: item.length === 0 ? "" : "pointer" }}
                disabled={item.length === 0}
              >
                {item}
              </Menubar.Trigger>
          ))}
        </Menubar.Menu>
      </Menubar.Root>
      {menuSelect < statusEnums.length ?
        <CensorPage data={censorContent} status={statusEnums[menuSelect]}/>
      : menuItemSelect === "Claims" ?
        <ClaimPage />
      : menuItemSelect === "History" ?
        <History />
      : null
      }
    </>
  );
}


const CensorPage = ({data, status}: {data: CensorContent[], status: CensorStatusEnum}) => {
  return (
    <Box p="4">
      <Flex direction="column" gap="2">
        <Grid columns="2" gap="1" width="100%">
          {data.filter(filterData => {
            if (status === CensorStatusEnum.STAKING) {
              return filterData.status === GUARANTEE_STAKING || filterData.status === CHALLENGE_STAKING
            } else if (status === CensorStatusEnum.VOTING) {
              return filterData.status === VOTING
            } else if (status == CensorStatusEnum.CLOSED) {
              return filterData.status === CLOSED
            } else {
              return true
            }
          }).map((item) => (
            <Card 
              key={item.id} 
              size="2"
              style={{
                width: '80%', 
                height: '200px', 
                padding: '16px',
                margin: '10px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Flex direction="column" gap="2">
                <Flex justify="between" align="start" style={{ height: '80px' }}>
                  <Link href={item.url} target="_blank" rel="noopener noreferrer">
                    <Text size="4" weight="bold">
                      {item.title}
                    </Text>
                  </Link>
                  {item.status === GUARANTEE_STAKING ?
                    <Badge color="blue">
                      {item.statusName}
                    </Badge>
                    : item.status === CHALLENGE_STAKING ?
                    <Badge color="red">
                      {item.statusName}
                    </Badge>
                    : item.status === VOTING ?
                    <Badge color="green">
                      {item.statusName}
                    </Badge>
                    : item.status === CLOSED ?
                    <Badge color="gray">
                      {item.result ? 
                        <Text color='green'>pass</Text>
                      : 
                        <Text color='pink'>not pass</Text>
                      }
                    </Badge>
                    :
                    <Badge color="gray">
                      {item.statusName}
                    </Badge>
                  }
                </Flex>
                <Text size="2" color="gray">
                  Creator: {item.author}
                </Text>
                <Flex justify="between" align="center">
                  <Link href={item.homepage} target="_blank" rel="noopener noreferrer">
                    <Text size="2" color="gray">
                      Project: {item.project}
                    </Text>
                  </Link>
                  <CensorDialog content={item}/>
                </Flex>
              </Flex>
              <Flex justify='center' align='center'>
                <Progress value={item.voteRate} color="green" style={{margin: '20px'}}/>
                <Text size="1" color='gray'>
                  {item.voteRate + '%' + (item.status === VOTING || item.status === CLOSED ? ' Approve' : '')}
                </Text>
              </Flex>
            </Card>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
};

const CensorDialog = ({content} : {content: CensorContent}) => {
  const currentAccount = useCurrentAccount();
  const [isMatch, setIsMatch] = React.useState<boolean | undefined>(true);
  const [canSave, setCanSave] = React.useState<boolean | undefined>(true);
  
  const handleMatchRule = () => {
    console.log("rule match");
    if (content.ruleMode === RuleModeEnum.MATCH_STRICT) {
      let res = currentAccount?.address.includes(content.rule)
      setIsMatch(res);
      setCanSave(res);
    }
  }
  React.useEffect(() => {
    if (content.status == VOTING) {
      handleMatchRule();
    }
  }, [])
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {content.status === GUARANTEE_STAKING ?
          <Button color="blue" variant="soft" disabled={content.isGuaranteeStaked} style={{ cursor: "pointer" }}>Stake</Button>
        : content.status === CHALLENGE_STAKING ?
          <Button color="red" variant="soft" disabled={content.isChallengeStaked} style={{ cursor: "pointer" }}>Stake</Button>
        : content.status === VOTING ?
          <Button color="green" variant="soft" disabled={content.isVoted} style={{ cursor: "pointer" }}>Vote</Button>
        : null
        }
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay"/>
        <Dialog.Content className="DialogContent">
				  <Dialog.Title className="DialogTitle">
            {content.status === GUARANTEE_STAKING ?
              "Guarantee Stake"
            : content.status === CHALLENGE_STAKING ?
              "Challenge Stake"
            : content.status === VOTING ?
              "Censor Vote"            
            : null
            }
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            <Flex>
              <Link href={content.url} style={{ cursor: "pointer" }} target="_blank" rel="noopener noreferrer">
              {content.title}
              </Link>
            </Flex>
          </Dialog.Description>
          {content.status === GUARANTEE_STAKING || content.status === CHALLENGE_STAKING ?
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="amount">
                Amount
              </label>
              <input className="Input" id="name" defaultValue="0" />
            </fieldset>
          : content.status === VOTING ?
            <>
              <Flex justify='center'>
                <RadioGroup.Root
                  className="RadioGroupRoot"
                  aria-label="View density"
                  disabled={!isMatch}
                >
                  <Flex justify='between'>
                    <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
                      <RadioGroup.Item className="RadioGroupItem" value="default" id="r1" style={{ cursor: "pointer" }}>
                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                      </RadioGroup.Item>
                      <label className="Label" htmlFor="r1">
                        Approve
                      </label>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", margin: "20px"}}>
                      <RadioGroup.Item className="RadioGroupItem" value="comfortable" id="r2" style={{ cursor: "pointer" }}>
                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                      </RadioGroup.Item>
                      <label className="Label" htmlFor="r2">
                        Disapprove
                      </label>
                    </div>
                  </Flex>
                </RadioGroup.Root>  
              </Flex>
              <Flex justify='center'>
                <Text color="red">{`Only the address contains '${content.rule}' can vote`}</Text>
              </Flex>
            </>
          : null
          }
          
          <div
            style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
          >
            <Dialog.Close asChild>
              <button className="DialogSubmit violet" disabled={!canSave} style={{ cursor: 'pointer' }}>
                {content.status === GUARANTEE_STAKING || content.status === CHALLENGE_STAKING ?
                  "Stake"
                : content.status === VOTING ?
                  "Vote"            
                : null
                }
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" style={{ cursor: "pointer" }} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default CensorList;


