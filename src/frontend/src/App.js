import React, {}  from 'react';
import {useState, useEffect} from "react";
import {getStudents, deleteStudent, addNewStudent} from "./client";

import {Breadcrumb, Button, Layout, Menu, Table, Spin, Empty, Badge, Tag, Avatar, Popconfirm, Radio, Image} from 'antd';
import {LaptopOutlined, NotificationOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons';
import StudentDrawerForm from "./StudentDrawerForm";

import './App.css';
import {errorNotification, successNotification} from "./Notification";

const { Header, Content, Footer, Sider } = Layout;
const {SubMenu} = Menu;

const confirm = (e) => {
    console.log(e);
    alert(JSON.stringify('Click on Yes', null, 2));
};

const cancel = (e) => {
    console.log(e);
    JSON.stringify('Click on No');
};

const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0){
        return <Avatar icon = {<UserOutlined/>}/>
        }
        const split = trim.split(" ");
        if(split.length === 1 ){
            return <Avatar>{name.charAt(0)}
            </Avatar>
        }
        return <Avatar>
            {`${name.charAt(0)}${name.charAt(name.length-1)}`}
        </Avatar>
}


const onDelete = (studentID, callback) => {
    console.log(studentID)
    deleteStudent(studentID)
        .then(() => {
            console.log("student deleted")
            successNotification("Student success deleted",`${studentID} was deleted to the system`)
            callback();
        }).catch(err => {
        console.log(err)
    })};

const columns = fetchStudent => [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) =>
            <TheAvatar name = {student.name}/>
    },
    {
        title: 'ID',
        dataIndex: 'student_id',
        key: 'ID',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },

    {
        title: 'Actions',
        dataIndex: 'popConfirm',
        render: (type, student) =>
            <Radio.Group>
            <Popconfirm
                title= {`Are you sure delete to this "${student.name}"?`}
                onConfirm= {() => onDelete(`${student.student_id}`, fetchStudent)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No">
                <Radio.Button>Delete</Radio.Button>
            </Popconfirm>
            <Radio.Button>Edit</Radio.Button>
            </Radio.Group>
    }
];

const items1 = ['1', '2'].map((key) => ({
    key,
    label: `Student ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `,menu${key}`,
        icon: React.createElement(icon),
        label: `menu ${key}`,
        children: new Array(2).fill(null).map((_, j) => {
            const subKey = index * 2 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false);
    const [show, setShow] = useState(true);

    const fetchStudent = () =>
        getStudents()
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setStudents(data);
                    }).catch(err => {
                        console.log(err.response)
                        err.response.json().then(res => {
                            console.log(res);
                            errorNotification("There was an issue", `${res.message} [${res.status}]`)
                        });
                    });
            useEffect(() => {
            fetchStudent();
        },
        []);

    const renderStudent = () => {
        if (students.length <= 0){
            return "no data";
        }

        return <>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudent={fetchStudent}
            />

                <Table dataSource={students}
                      columns={columns (fetchStudent)}
                      bordered
                      title={() =>
                          <>
                              <Tag>Total Students</Tag>
                          <Badge
                                count={show ? students.length : 0}
                          />
                              <br/> <br/>
                              <Button
                                  onClick={() => setShowDrawer(!showDrawer)}
                                  type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                                  Add New Student
                              </Button>
                          </>
                      }
                      pagination = {{pageSize: 50}}
                      scroll = {{y: 800}}
                       rowKey={student => student.id}
            />
        </>
    }

   return <Layout>
        <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
        </Header>
        <Content
            style={{
                padding: '0 50px',
            }}
        >
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
            <Layout
                className="site-layout-background"
                style={{
                    padding: '24px 0',
                }}
            >
                <Sider className="site-layout-background" width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                        }}
                        items={items2}
                    />
                </Sider>
                <Content
                    style={{
                        padding: '0 24px',
                        minHeight: 280,
                    }}
                >
                    {renderStudent()}
                </Content>
            </Layout>
            <Footer style={{textAlign: 'center'}}>
                <Image
                    width={75}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png"
                />
            </Footer>

        </Content>

    </Layout>
}

export default App;
