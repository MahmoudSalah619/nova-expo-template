import { useRef, useState, useEffect, useMemo } from "react";
import { View, TouchableOpacity, FlatList, Modal, Pressable } from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Text from "@/components/shared/ui/Text/Base";
import Icon from "@/components/shared/ui/Icon";
import RadioButton from "@/components/shared/ui/RadioButton";
import RotateArrow from "@/components/shared/ui/RotateArrow";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import METRICS from "@/constants/Metrics";
import i18n from "@/locale";
import Input from "../Input";
import { InputSize } from "../Input/types";
import Checkbox from "../Checkbox";
import ShadowWrapper from "../ShadowWrapper";
import { measureButtonPosition } from "./ListPosition";
import { DropdownPosition, DropDownProps } from "./types";
import styles from "./styles";

export default function DropDown({
  data,
  onChange,
  inputValue,
  InputLabel,
  InputPlaceholder = i18n.t("CHOOSE"),
  error,
  containerStyle,
  customInputStyle,
  isLoading,
  arrowPosition = "suffix",
  emptyPlaceholder,
  onLoadMore,
  isLoadingMore,
  disabled = false,
  isMulti = false,
  coloredSelected = false,
  isRadio = false,
  containerHeight = METRICS.screenHeight * 0.3,
  dropDownSize = InputSize.xl,
  customRef,
  modalOptionsCustomStyle,
}: DropDownProps) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({
    top: 0,
    start: 0,
    width: 0,
    end: 0,
  });
  const refButton = useRef<View>(null);
  const listHeight = useSharedValue(0);

  const toggleList = () => {
    listHeight.value = withSpring(
      listHeight.value !== containerHeight ? containerHeight : 0,
      {
        duration: 640,
        reduceMotion: ReduceMotion.System,
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: listHeight.value,
      opacity: listHeight.value === 0 ? 0 : 1,
      overflow: "hidden",
    };
  });

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
    toggleList();
  };

  const onDismissModal = () => {
    setIsModalVisible(false);
    listHeight.value = withSpring(0, {
      duration: 300,
    });
  };

  const isValueSelected = (value: string | number): boolean => {
    if (isMulti) {
      return Array.isArray(inputValue) && inputValue.includes(value);
    }
    return inputValue === value;
  };

  const selectedItems = useMemo(() => {
    if (isMulti && Array.isArray(inputValue)) {
      return data.filter((item) => inputValue.includes(item.value));
    }
    if (!isMulti && inputValue) {
      return data.filter((item) => item.value === inputValue);
    }
    return [];
  }, [data, inputValue, isMulti]);

  const displayText = selectedItems[0]?.label || "";

  const onSelectItem = (selectedItemValue: number | string) => {
    if (!isMulti) {
      onChange(selectedItemValue);
      onDismissModal();
      return;
    }
    const currentValues = Array.isArray(inputValue) ? inputValue : [];
    const newValues = currentValues.includes(selectedItemValue)
      ? currentValues.filter((value) => value !== selectedItemValue)
      : [...currentValues, selectedItemValue];
    onChange(newValues.length > 0 ? newValues : null);
  };

  const onRemoveItem = (valueToRemove: string | number) => {
    if (!isMulti) return;
    const currentValues = Array.isArray(inputValue) ? inputValue : [];
    const newValues = currentValues.filter((value) => value !== valueToRemove);
    onChange(newValues.length > 0 ? newValues : null);
  };

  useEffect(() => {
    if (!isModalVisible) return;

    measureButtonPosition({
      ref: customRef || refButton,
      callback: setDropdownPosition,
    });
  }, [isModalVisible, isMulti, selectedItems, customRef]);

  const arrowColor = disabled ? "disabled" : "primary";

  const renderModal = () => (
    <Modal transparent visible={isModalVisible} onRequestClose={onDismissModal}>
      <Pressable onPress={onDismissModal} style={GLOBAL_STYLES.fullSize}>
        <Animated.View
          style={[styles.modalContainer, dropdownPosition, animatedStyle]}
        >
          <ShadowWrapper borderRadius={10}>
            <FlatList
              data={data}
              style={!isMulti && [styles.flatList, modalOptionsCustomStyle]}
              keyExtractor={(item) => `${item?.label}${item?.value}`}
              showsVerticalScrollIndicator
              renderItem={({ item }) => {
                const isSelected = isValueSelected(item.value);
                return (
                  <TouchableOpacity
                    onPress={() => onSelectItem(item?.value)}
                    style={[
                      styles.item,
                      coloredSelected && isSelected && styles.selectedItem,
                      !isMulti && !isRadio && styles.singleItem,
                      isMulti && styles.multiItem,
                    ]}
                  >
                    {isRadio && <RadioButton selected={isSelected} disabled />}
                    {isMulti && !isRadio && (
                      <Checkbox
                        checked={isSelected}
                        size={20}
                        onPress={() => onSelectItem(item.value)}
                      />
                    )}
                    <Text variant="sm" color="heading" autoTranslate={false}>
                      {item?.label}
                    </Text>
                    {isSelected && !isMulti && !isRadio && (
                      <View style={styles.selectedCheckContainer}>
                        <Icon name="check" color="action" size={12} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                if (!isLoadingMore && onLoadMore) onLoadMore();
              }}
            />
          </ShadowWrapper>
        </Animated.View>
      </Pressable>
    </Modal>
  );

  const MultiInputMarkup = (
    <View>
      <View
        style={[
          styles.multiInputContainer,
          isModalVisible && styles.multiInputContainerActive,
          error ? styles.errorBorder : undefined,
          containerStyle,
        ]}
      >
        {arrowPosition === "prefix" && (
          <View style={styles.prefixContainer}>
            <RotateArrow isOpen={isModalVisible} color={arrowColor} />
          </View>
        )}

        {selectedItems.length ? (
          <View style={styles.tagsInInputWrapper}>
            {selectedItems.map((item) => (
              <View key={item.value} style={styles.tagInInput}>
                <Text variant="sm" color="heading" autoTranslate={false}>
                  {item.label}
                </Text>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    onRemoveItem(item.value);
                  }}
                  style={styles.removeIconInInput}
                >
                  <Icon name="closeIcon" color="black" size={12} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.placeHolder}>{InputPlaceholder}</Text>
        )}

        {arrowPosition === "suffix" && (
          <RotateArrow isOpen={isModalVisible} color={arrowColor} />
        )}
      </View>
      {error && (
        <Text variant="xsm" color="danger">
          {error}
        </Text>
      )}
    </View>
  );

  const SingleInputMarkup = (
    <View pointerEvents="none">
      <Input
        editable={false}
        placeholder={emptyPlaceholder || InputPlaceholder}
        value={displayText}
        error={error}
        disabled={disabled}
        prefix={
          arrowPosition === "prefix" ? (
            <RotateArrow color={arrowColor} isOpen={isModalVisible} />
          ) : null
        }
        suffix={
          arrowPosition === "suffix" ? (
            <RotateArrow color={arrowColor} isOpen={isModalVisible} />
          ) : null
        }
        containerStyle={[
          isModalVisible
            ? styles.multiInputContainerActive
            : styles.inputContainerStyle,
          customInputStyle || {},
        ]}
      />
    </View>
  );

  return (
    <View style={styles[dropDownSize]}>
      {InputLabel && (
        <Text
          variant="sm"
          color={disabled ? "disabled" : "body"}
          style={styles.labelText}
        >
          {InputLabel}
        </Text>
      )}
      {renderModal()}
      <TouchableOpacity
        disabled={isLoading || !data?.length || disabled}
        onPress={handleModal}
        ref={refButton}
        activeOpacity={0.7}
      >
        {isMulti ? MultiInputMarkup : SingleInputMarkup}
      </TouchableOpacity>
    </View>
  );
}
