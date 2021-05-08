import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CircleProgress from "../../components/CircleProgress";
import { ROUTES } from "../../routes/config-routes";
import { otpActionsCreator } from "../../store/actions/otp.action";
import { RootState } from "../../store/reducers";
import Swipeout from 'react-native-swipeout';
import Icon from "../../components/Icon";
import OtpItem from "../../components/item-otp";

const second = () => (new Date()).getUTCSeconds() % 30;

let timer: any
const Home = ({navigation}) => {
    const { list }: {list: any[]} = useSelector((state: RootState) => state.OtpReducer)
    console.log(`🛠 LOG: 🚀 --> --------------------------------------------------------------`);
    console.log(`🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 10 ~ Home ~ list`, list);
    console.log(`🛠 LOG: 🚀 --> --------------------------------------------------------------`);
    const [time, setTime] = useState(second);
    const [danger, setDanger] = useState(false);
    const dispatch = useDispatch()
    const gotoScan = () => {
        navigation.navigate(ROUTES.QR_SCAN);
    };

    const updateOTP = () => {
        dispatch(otpActionsCreator.updateOtp())
        setDanger(false)
    }

    const clearTimer = () => {
        timer && clearInterval(timer)
    }

    useEffect(() => {
        if(list.length) {
            timer = setInterval(() => {
                const time = second();
                setTime((prevTime) => {
                  console.log(`🛠 LOG: 🚀 --> -------------------------------------------------------------------------`);
                  console.log(`🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 39 ~ setTime ~ prevTime`, prevTime);
                  console.log(`🛠 LOG: 🚀 --> -------------------------------------------------------------------------`);
                  if(30 - prevTime <= 5) {
                    setDanger(true);
                  }
                  if (prevTime > time) {
                    updateOTP();
                  }
                  return time;
                });
            }, 500);
        }
    }, [list])

    const renderItem = ({ item }: any) => {
        return <OtpItem {...{item, time,danger, clearTimer}}/>
      };

    const content = () => {
        if (!list.length) {
            return <View style={styles.noData}>
                <Text style={{ fontSize: 18, color: '#999' }}>
                No authentication codes
                </Text>
                <TouchableOpacity
                onPress={gotoScan}
                style={styles.scanBtn}
                >
                <Text style={styles.scanText}>
                    Scan Barcode
                </Text>
                </TouchableOpacity>
            </View>
        }
        

        return (
            <FlatList
            data={list}
            extraData={time}
            renderItem={renderItem}
            style={styles.listView}
            keyExtractor={item => item.secret}
            />
        );
    };
  return <View style={styles.container}>{content()}</View>;
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
    backgroundColor: '#eeeeec'
  },
  scanBtn: {
    backgroundColor: '#007fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 4,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  scanText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8
  },
  listView: {
    backgroundColor: '#eeeeec'
  },
  containerItem: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fcfcfc',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    color: '#3c80f7',
    fontSize: 40
  },
  user: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginLeft: 5
  },
  icon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
