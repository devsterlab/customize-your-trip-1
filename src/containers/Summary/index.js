import React, { Component, PropTypes } from 'react';
import Timeline from '../../components/Timeline';
import Category from '../../components/Timeline/Category';
import Title from '../../components/Timeline/Title';
import Item from '../../components/Timeline/Item';
import Content from '../../components/Timeline/Content';
import Actions from '../../components/Timeline/Actions';

class Summary extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <div>
                <Timeline>
                    <Category>
                        <Title date={new Date()} secondary="01/05 - 02/05 | 3 nights" icon="mdi-home">San Diego</Title>
                        <Item icon="mdi-airplane">
                            <Content>
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                            </Content>
                            <Actions></Actions>
                        </Item>
                        <Item className="last" icon="mdi-hotel">
                            <Content>
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                            </Content>
                            <Actions></Actions>
                        </Item>
                    </Category>
                    <Category className="last">
                        <Title date={new Date()} secondary="03/05 - 10/05 | 7 nights">New York</Title>
                        <Item>
                            <Content>
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                            </Content>
                            <Actions></Actions>
                        </Item>
                        <Item className="last" icon="mdi-hotel">
                            <Content>
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                                Some-content Some-content Some-content Some-content
                            </Content>
                            <Actions></Actions>
                        </Item>
                    </Category>
                </Timeline>
            </div>
        );
    }
}

export default Summary;
