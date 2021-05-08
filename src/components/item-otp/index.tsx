import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {useDispatch} from 'react-redux';
import Icon from '../../components/Icon';
import {otpActionsCreator} from '../../store/actions/otp.action';
import CircleProgress from '../CircleProgress';

const OtpItem = ({item, time, clearTimer, danger}) => {
  const dispatch = useDispatch();
  const deleteItem = useCallback(() => {
    dispatch(otpActionsCreator.deleteOtp(item));
    clearTimer();
  }, [clearTimer, dispatch, item]);

  const TrashIcon = () => (
    <View style={styles.icon}>
      <Icon name="trash" size={30} color="#fff" />
    </View>
  );
  const btns = [
    {
      component: <TrashIcon />,
      backgroundColor: 'red',
      onPress: () => deleteItem(),
    },
  ];
  return (
    <Swipeout right={btns} autoClose backgroundColor="transparent">
      <TouchableOpacity>
        <View style={styles.containerItem}>
          <Text
            style={[
              styles.title,
              {color: danger ? 'red' : styles.title.color},
            ]}>
            {item.otp}
          </Text>
          <View style={styles.itemContent}>
            <Text
              style={[
                styles.user,
                {color: danger ? 'red' : styles.user.color},
              ]}>
              {item.name}
            </Text>
            <CircleProgress radius={8} percent={(time / 30) * 100} />
          </View>
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
};

export default OtpItem;

const styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fcfcfc',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#3c80f7',
    fontSize: 40,
  },
  user: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginLeft: 5,
  },
  icon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
