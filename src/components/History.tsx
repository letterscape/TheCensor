import { Tooltip } from "radix-ui";
import { Badge, Table } from "@radix-ui/themes";

const recordTypeNames = ["", "Create", "Guarantee Stake", "Challenge Stake", "Vote", "Claim"];
const recordTypeColors = ["gray", "mint", "blue", "red", "green", "violet"];
type BadgeColor = 
  "gray" | "gold" | "bronze" | "brown" | "yellow" | "amber" | 
  "orange" | "tomato" | "red" | "ruby" | "crimson" | "pink" | 
  "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | 
  "cyan" | "teal" | "jade" | "green" | "grass" | "lime" | "mint" | "sky";
enum RecordTypeEnum {
  NONE,
  CREATE,
  GUARANTEE_STAKE,
  CHALLENGE_STAKE,
  VOTE,
  CLAIM,
}

type Record = {
  id: string,
  title: string,
  type: number,
  value1: string,
  value2: string,
}

const records: Record[] = [
  {id: "1", title: 'Building Wealth is Conceptually Simple', type: 1, value1: '0', value2: '' },
  {id: "2", title: 'Governance Decides Where Ethereum Transacts: The L2 Governance Race', type: 2, value1: '235', value2: '' },
  {id: "3", title: 'Ethnographic Insights on Point Systems', type: 3, value1: '77', value2: '' },
  {id: "4", title: 'I am a professional trader and I will teach you how to make money in one article (not clickbait)', type: 4, value1: '0', value2: '' },
  {id: "5", title: '"the updates" ENE', type: 5, value1: '10.8', value2: '2' },
]

const History = () => {

  return (
    <>
      <Table.Root variant="surface" style={{margin: '20px'}}>
        <Table.Header style={{ backgroundColor: 'var(--gray-7)' }}>
          <Table.Row>
            <Table.ColumnHeaderCell justify='center'>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify='center'>Operation</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify='center'>Detail</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body style={{ backgroundColor: 'var(--gray-5)', opacity: 0.7}}>
          {records.map((item) => (
            <Table.Row>
              <Table.RowHeaderCell width="30%" justify='center'>
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <span className="ellipsis-text">{item.title}</span>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="tooltip-content">
                        {item.title}
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </Table.RowHeaderCell>
              <Table.Cell width="30%" justify='center'>
                <Badge size='2' color={recordTypeColors[item.type] as BadgeColor}>
                  {recordTypeNames[item.type]}
                </Badge>
              </Table.Cell>
              {
              item.type === RecordTypeEnum.CREATE ?
                <Table.Cell width="30%" justify='center'></Table.Cell>
              :
              item.type === RecordTypeEnum.GUARANTEE_STAKE || 
              item.type === RecordTypeEnum.CHALLENGE_STAKE ?
                <Table.Cell width="30%" justify='center'>Stake {item.value1}</Table.Cell>
              :
              item.type === RecordTypeEnum.VOTE ?
                <Table.Cell width="30%" justify='center'>{item.value1 ? "Approve" : "Disapprove"}</Table.Cell>
              :
              item.type === RecordTypeEnum.CLAIM ?
                <Table.Cell width="30%" justify='center'>
                  Staking: {item.value1} Token: {item.value2}
                </Table.Cell>
              : null  
              }
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}

export default History;