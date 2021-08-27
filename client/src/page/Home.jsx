import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import http from '../api/http';
import { NotificationError, NotificationSuccess } from '../common/Notification';
import Login from '../components/Login';
import Register from '../components/Register';
import UserList from '../components/UserList';
function Home(props) {

    const history = useHistory();
    const isLogin = localStorage.getItem("isLogin")
    const [isToggle, setIsToggle] = useState(false)
    const [userList, setUserList] = useState([])
    const [loadingdata, setLoadingdata] = useState(false)
    const currentUser = JSON.parse(localStorage.getItem("user"))

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem("refresh_token")
        if (!refreshToken) {
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            localStorage.removeItem("isLogin")
            history.push("/")
            return;
        }
        const res = await http.post("/refresh_token", {
            token: refreshToken
        })
        if (res?.status === 200) {
            // console.log("res", res);
            NotificationSuccess("", "Refresh Token thành công")
            const { access_token } = res?.data
            localStorage.setItem("access_token", access_token)
            return access_token
        }
    }
    const handleGetUser = async () => {
        let access_token = localStorage.getItem("access_token")

        if (access_token) {
            try {
                setLoadingdata(true)
                fetchInfo();
                const res = await http.get("/all", {
                    headers: { Authorization: access_token }
                })

                if (res?.status === 200) {
                    // console.log("allUser", res);
                    setUserList(res?.data.user)
                    NotificationSuccess("", "Lấy danh sách thành công")
                    setLoadingdata(false)
                    // fetchInfo()
                }
            } catch (error) {
                setLoadingdata(false)
                NotificationError("", error.msg)
                setUserList([])
            }
        } else {
            // 
        }
    }
    const handleLogout = () => {
        history.push("/")
        localStorage.clear()
        setUserList([])
        setInfo(null)
    }
    const toggleRegister = () => {
        setIsToggle(!isToggle)
    }

    const [info, setInfo] = useState()

    const fetchInfo = async () => {
        try {
            const res = await http.get("/info")
            if (res?.status === 200) {
                console.log(res);
                setInfo(res?.data?.user)
            }
        } catch (error) {
            console.log(error);
        }
    }
    // useEffect(() => {
    //     fetchInfo()
    // }, [])
    return (
        <div>
            {
                isLogin ? <>
                    <div style={{ marginTop: "30px" }} className="infoUser">
                        <img src={currentUser?.avatar} alt="" style={{ width: "80px", height: "80px" }} />
                        <h4>{currentUser?.username}</h4>
                        <button onClick={handleGetUser}>Lấy danh sách người dùng</button>
                        <button onClick={refreshToken}>Refresh Token</button>
                        <button onClick={handleLogout}>Đăng xuất</button>
                    </div>
                    <h5>Thông tin cá nhận:
                        {
                            info ? JSON.stringify(info) : null
                        }
                    </h5>
                    <UserList loadingdata={loadingdata} userList={userList}></UserList>
                </> :
                    <div className="login-register">
                        <div className="container-box">
                            {
                                isToggle ?
                                    <Register toggleRegister={toggleRegister}></Register>
                                    :
                                    <Login toggleRegister={toggleRegister}></Login>
                            }

                        </div>
                    </div>
            }
        </div>
    );
}

export default Home;