import { Badge, Box, Button, Card, Container, Flex, Grid, Link, Progress, Text } from '@radix-ui/themes';
import { Dialog, Menubar, RadioGroup } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import "../styles.css";
import React from 'react';

enum CensorStatusEnum {
  NONE,
  STAKING,
  VOTING,
  CLOSED,
}

const GUARANTEE_STAKING = 2;
const CHALLENGE_STAKING = 3;
const VOTING = 4;
const CLOSED = 5;

const censorContent: CensorContent[] = [
  { id: '1', title: 'Title 1', author: 'author A', url:'', project: 'Mirror', website: 'https://mirror.xyz/', status: 2, statusName: 'Guarantee Staking', voteRate: 0 },
  { id: '2', title: 'Title 2', author: 'author B', url:'', project: 'Mirror', website: 'https://mirror.xyz/', status: 3, statusName: 'Challenge Staking', voteRate: 0 },
  { id: '3', title: 'Title 3', author: 'author C', url:'', project: 'Mirror', website: 'https://mirror.xyz/', status: 4, statusName: 'Voting', voteRate: 20 },
  { id: '4', title: 'Title 4', author: 'author D', url:'', project: 'Mirror', website: 'https://mirror.xyz/', status: 5, statusName: 'Closed', voteRate: 60  },
  // 可以根据需要添加更多数据
];

type CensorContent =  {
  id: string,
  title: string,
  author: string,
  url: string,
  project: string,
  website: string,
  status: number,
  statusName: string,
  voteRate: number,
}

const CensorList = () => {

  const menuItems = ["All", "Staking", "Voting", "Closed"];
  const statusEnums = [CensorStatusEnum.NONE, CensorStatusEnum.STAKING, CensorStatusEnum.VOTING, CensorStatusEnum.CLOSED];
  const [censorStatus, setCensorStatus] = React.useState<CensorStatusEnum>(CensorStatusEnum.NONE);
  const handleCensorStatus = (status: CensorStatusEnum) => {
    setCensorStatus(status);
  }
  return (
    <>
      <Menubar.Root className="MenubarRoot">
        <Menubar.Menu>
          {statusEnums.map((item, index) => (
            <Menubar.Trigger
              key={item}
              onClick={() => handleCensorStatus(item)}
              className={`MenubarTrigger ${censorStatus === index ? "active" : ""}`}
              style={{ cursor: "pointer" }}
            >
              {menuItems[index]}
            </Menubar.Trigger>
          ))}
        </Menubar.Menu>
      </Menubar.Root>
      <CensorPage data={censorContent} status={censorStatus}/>
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
                height: '150px', 
                padding: '16px',
                margin: '10px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Flex direction="column" gap="2">
                <Flex justify="between" align="center">
                  <Link href={item.url}>
                    <Text size="4" weight="bold">
                      {item.title}
                    </Text>
                  </Link>
                  {item.status === GUARANTEE_STAKING ?
                    <Badge color="blue">
                      {item.statusName}
                    </Badge>
                    : item.status === CHALLENGE_STAKING ?
                    <Badge color="pink">
                      {item.statusName}
                    </Badge>
                    : item.status === VOTING ?
                    <Badge color="green">
                      {item.statusName}
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
                  <Link href={item.website}>
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

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        {content.status === GUARANTEE_STAKING ?
          <Button color="blue" variant="soft" style={{ cursor: "pointer" }}>Stake</Button>
        : content.status === CHALLENGE_STAKING ?
          <Button color="pink" variant="soft" style={{ cursor: "pointer" }}>Stake</Button>
        : content.status === VOTING ?
          <Button color="green" variant="soft" style={{ cursor: "pointer" }}>Vote</Button>
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
              "Vote"            
            : null
            }
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            <Link href={content.url} style={{ cursor: "pointer" }}>
            {content.title}
            </Link>
          </Dialog.Description>
          {content.status === GUARANTEE_STAKING || content.status === CHALLENGE_STAKING ?
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="amount">
                  Amount
                </label>
                <input className="Input" id="name" defaultValue="0" />
              </fieldset>
            : content.status === VOTING ?
            <Flex justify='center'>
              <RadioGroup.Root
                className="RadioGroupRoot"
                defaultValue="default"
                aria-label="View density"
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
            : null
            }
          <div
            style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
          >
            <Dialog.Close asChild>
              <button className="Button ">
                {content.status === GUARANTEE_STAKING ?
                  "Stake"
                : content.status === CHALLENGE_STAKING ?
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


