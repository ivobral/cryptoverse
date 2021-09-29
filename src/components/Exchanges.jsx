import React from 'react'
import { Row, Col, Typography, Collapse, Spin, Avatar} from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';

import { useGetCryptoExchangesQuery } from '../services/cryptoApi';

const { Panel } = Collapse;
const { Text } = Typography;

const Exchanges = () => {
    const { data, isFetching } = useGetCryptoExchangesQuery();
    const exchanges = data?.data?.exchanges;

    if(isFetching) return <Spin tip="Loading..." />;

    return (
        <>
            <Row className="exchanges-characteristics">
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24 trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>

            <Collapse defaultActiveKey={['1']} >
                {exchanges.map((exchange) => (
                    <Panel 
                        key={exchange.rank} 
                        showArrow={false}
                        header={(
                            <Row>
                                <Col span={6} className="exchange-name-container">
                                    <Text className="ime"><strong>{exchange.rank}.</strong></Text>
                                    <Avatar className="ime" src={exchange.iconUrl} />
                                    <Text className="ime">{exchange.name}</Text> 
                                </Col>
                                <Col span={6}>
                                    <Text>${millify(exchange.volume)}</Text>
                                </Col>
                                <Col span={6}>
                                    <Text>{millify(exchange.numberOfMarkets)}</Text>
                                </Col>
                                <Col span={6}>
                                    <Text>{millify(exchange.marketShare)}%</Text>
                                </Col>
                            </Row>
                        )}
                    >
                        {HTMLReactParser(exchange.description || '')}
                    </Panel>
                ))}
            </Collapse>
        </>
    )
}

export default Exchanges
