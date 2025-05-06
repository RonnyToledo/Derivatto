import React, {
  useState,
  useCallback,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { ScrollView, RefreshControl, ScrollViewProps } from "react-native";
import { useRouter } from "expo-router";

// Props extend native ScrollViewProps to allow all standard ScrollView properties
interface ScrollViewReloadProps extends ScrollViewProps {
  children: ReactNode;
}

const ScrollViewReload = forwardRef<ScrollView, ScrollViewReloadProps>(
  ({ children, style, contentContainerStyle, ...rest }, ref) => {
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();
    const innerRef = useRef<ScrollView>(null);

    // Expose the inner ScrollView methods to the parent ref
    useImperativeHandle(ref, () => innerRef.current!);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      router.reload();
      setTimeout(() => setRefreshing(false), 800);
    }, [router]);

    return (
      <ScrollView
        ref={innerRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={[style, { flex: 1 }]}
        contentContainerStyle={contentContainerStyle}
        {...rest}
      >
        {children}
      </ScrollView>
    );
  }
);
export default ScrollViewReload;
