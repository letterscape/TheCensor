import * as React from "react";
import { Form } from 'radix-ui';
import "../styles.css";
import { Container, Flex, Heading } from "@radix-ui/themes";


const Setting = () => {

  const [formData, setFormData] = React.useState({
    name: '',
    website: '',
    guaranteeDeadline: '',
    guarantorNumber: '',
    guaranteeStakingTotal: '',
    challengeDeadline: '',
    challengerNumber: '',
    challengeStakingTotal: '',
    voteDeadline: '',
    voteMinLimit: '',
    forfeitRate: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // 在此处理表单提交逻辑，例如发送数据到服务器
    console.log('表单数据:', formData);
  };

  return (
    <Container className='form-container'>
      <Flex justify='center'>
        <Heading style={{margin: '10px'}}>
          Project Censor Configuration
        </Heading>
      </Flex>
      
      <Flex justify='center'>
        <Form.Root className="FormRoot" onSubmit={handleSubmit}>
          <Flex gap='9' justify='center'>
            <Form.Field className="FormField" name="name">
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              > */}
                <Form.Label className="FormLabel">Project Name</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing" style={{color: 'red'}}>
                  Required
                </Form.Message>
              {/* </div> */}
              <Form.Control asChild>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="website">
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              > */}
                <Form.Label className="FormLabel">Project Website</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing" style={{color: 'red'}}>
                  Required
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch" style={{color: 'red'}}>
                  Invalid URL
                </Form.Message>
              {/* </div> */}
              <Form.Control asChild>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                />
              </Form.Control>
            </Form.Field>
          </Flex>
          <Flex gap='9' justify='center'>
            <Form.Field className="FormField" name="guaranteeDeadline">
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              > */}
                <Form.Label className="FormLabel">Guarantee Deadline(Hour)</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing" style={{color: 'red'}}>
                  Required
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch" style={{color: 'red'}}>
                  Invalid Number
                </Form.Message>
              {/* </div> */}
              <Form.Control asChild>
                <input
                  type="number"
                  name="guaranteeDeadline"
                  value={formData.guaranteeDeadline}
                  onChange={handleChange}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="challengeDeadline">
            {/* <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            > */}
              <Form.Label className="FormLabel">Challenge Deadline(Hour)</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing" style={{color: 'red'}}>
                Required
              </Form.Message>
              <Form.Message className="FormMessage" match="typeMismatch" style={{color: 'red'}}>
                Invalid Number
              </Form.Message>
            {/* </div> */}
            <Form.Control asChild>
              <input
                type="number"
                name="challengeDeadline"
                value={formData.challengeDeadline}
                onChange={handleChange}
                required
              />
            </Form.Control>
            </Form.Field>
          </Flex>
          <Flex gap='9' justify='center'>
            <Form.Field className="FormField" name="guarantorNumber">
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              > */}
                <Form.Label className="FormLabel">Guarantor Number</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing" style={{color: 'red'}}>
                  Required
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch" style={{color: 'red'}}>
                  Invalid Number
                </Form.Message>
              {/* </div> */}
              <Form.Control asChild>
                <input
                  type="number"
                  name="guarantorNumber"
                  value={formData.guarantorNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="challengerNumber">
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              > */}
                <Form.Label className="FormLabel">Challenger Number</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing" style={{color: 'red'}}>
                  Required
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch" style={{color: 'red'}}>
                  Invalid Number
                </Form.Message>
              {/* </div> */}
              <Form.Control asChild>
                <input
                  type="number"
                  name="challengerNumber"
                  value={formData.challengerNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Control>
            </Form.Field>
          </Flex>
          <Flex gap='9' justify='center'>
            <Form.Field className="FormField" name="guaranteeStakingTotal">
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              > */}
                <Form.Label className="FormLabel">Guarantee Staking Total</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing" style={{color: 'red'}}>
                  Required
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch" style={{color: 'red'}}>
                  Invalid Number
                </Form.Message>
              {/* </div> */}
              <Form.Control asChild>
                <input
                  type="number"
                  name="guaranteeStakingTotal"
                  value={formData.guaranteeStakingTotal}
                  onChange={handleChange}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="challengeStakingTotal">
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              > */}
                <Form.Label className="FormLabel">Challenge Staking Total</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing" style={{color: 'red'}}>
                  Required
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch" style={{color: 'red'}}>
                  Invalid Number
                </Form.Message>
              {/* </div> */}
              <Form.Control asChild>
                <input
                  type="number"
                  name="challengeStakingTotal"
                  value={formData.challengeStakingTotal}
                  onChange={handleChange}
                  required
                />
              </Form.Control>
            </Form.Field>
          </Flex>
          <Flex gap='9' justify='center'>
            <Form.Field className="FormField" name="voteDeadline">
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              > */}
                <Form.Label className="FormLabel">Vote Deadline(Hour)</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing" style={{color: 'red'}}>
                  Required
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch" style={{color: 'red'}}>
                  Invalid Number
                </Form.Message>
              {/* </div> */}
              <Form.Control asChild>
                <input
                  type="number"
                  name="voteDeadline"
                  value={formData.voteDeadline}
                  onChange={handleChange}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="voteMinLimit">
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              > */}
                <Form.Label className="FormLabel">Minimum vote Number</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing" style={{color: 'red'}}>
                  Required
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch" style={{color: 'red'}}>
                  Invalid Number
                </Form.Message>
              {/* </div> */}
              <Form.Control asChild>
                <input
                  type="number"
                  name="voteMinLimit"
                  value={formData.voteMinLimit}
                  onChange={handleChange}
                  required
                />
              </Form.Control>
            </Form.Field>
          </Flex>
          <Flex gap='9' justify='center'>
            <Form.Field className="FormField" name="forfeitRate">
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              > */}
                <Form.Label className="FormLabel">Forfeit Rate(%)</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing" style={{color: 'red'}}>
                  Required
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch" style={{color: 'red'}}>
                  Invalid Number
                </Form.Message>
              {/* </div> */}
              <Form.Control asChild>
                <input
                  type="number"
                  name="forfeitRate"
                  value={formData.forfeitRate}
                  onChange={handleChange}
                  required
                />
              </Form.Control>
            </Form.Field>
          </Flex>
          <Flex justify='center'>
            <Form.Submit asChild>
              <button className="Button" type="submit" style={{ marginTop: 10 }}>Submit</button>
            </Form.Submit>
          </Flex>
        </Form.Root>
      </Flex>
    </Container>
    
  );
}
export default Setting;