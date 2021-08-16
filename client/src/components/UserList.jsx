import { Col, Row, Table, Tag } from 'antd';
import React from 'react';
import LoadingTable from '../common/LoadingTable';
function UserList({ userList, loadingdata }) {

    const columns = [
        {
            title: 'STT',
            dataIndex: '_id',
            key: '_id',
            render: (id, item, index) => {
                return (
                    <div>{index + 1}</div>
                )
            }
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'name',
            // sorter: true,
            sorter: (a, b) => a.username.length - b.username.length,
            render: (id, item, index) => {
                return (
                    <div><img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={item.avatar} alt="" /> {item.username}</div>
                )
            }

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            sorter: (a, b) => a.role - b.role,
            render: (item) => {
                return (
                    <div>
                        {item === 1 ? <Tag color="success">quản trị viên</Tag> : <Tag color="error">người dùng</Tag>}
                    </div>
                )
            }
        },
    ];
    return (
        <>
            <Row justify="center" style={{ marginTop: "20px" }}>
                <Col span={12}>
                    <Table
                        dataSource={userList}
                        pagination={false}
                        columns={columns}
                        // rowSelection={rowSelection}
                        rowKey="_id"
                        loading={{
                            spinning: loadingdata,
                            indicator: <LoadingTable />
                        }}
                    />
                </Col>
            </Row>
        </>
    );
}

export default UserList;