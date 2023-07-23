/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

import renderer, { act } from 'react-test-renderer';
import { describe, test, expect } from "@jest/globals"
import { Text, TouchableOpacity } from 'react-native';

describe('App', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

    test('Clicking "Increment" button with 100 press', () => {
    const tree = renderer.create(<App />);
    const instance = tree.root;
    const button = instance.findByType(TouchableOpacity);
    for (let i = 1; i <= 100; i++) {
      act(() => {
        button.props.onPress();
      });
    }
    const countText = instance.findAllByType(Text)[0];
    const countTextContent = countText.props.children.join(''); 
    expect(countTextContent).toBe('Count: 100');
  });

  /**
   * Test normal
   */
  test('initial count is 0', () => {
    const tree = renderer.create(<App />);
    const instance = tree.root;
    const countText = instance.findAllByType(Text)[0];
    const countTextContent = countText.props.children.join(''); 
    expect(countTextContent).toBe('Count: 0');
  });

  test('button text is "Increment"', () => {
    const tree = renderer.create(<App />);
    const instance = tree.root;
    const buttonText = instance.findByType(TouchableOpacity).findByType(Text);
    expect(buttonText.props.children).toBe('Increment');
  });

  test('clicking "Increment" button increments count', () => {
    const tree = renderer.create(<App />);
    const instance = tree.root;
    const button = instance.findByProps({ testID: 'incrementButton' });
    act(() => {
      button.props.onPress();
    });
    const countText = instance.findAllByType(Text)[0];
    const countTextContent = countText.props.children.join(''); 
    expect(countTextContent).toBe('Count: 1');
  });


  test('button background color is "#007BFF"', () => {
    const tree = renderer.create(<App />);
    const instance = tree.root;
    const button = instance.findByProps({ testID: 'incrementButton' });
    expect(button.props.style.backgroundColor).toBe('#007BFF');
  });

  test('matches snapshot after multiple button presses', () => {
    const tree = renderer.create(<App />);
    const instance = tree.root;
    const button = instance.findByProps({ testID: 'incrementButton' });
    for (let i = 1; i <= 2; i++) {
      act(() => {
        button.props.onPress();
      });
    }
    const treeAfterPresses = tree.toJSON();
    expect(treeAfterPresses).toMatchSnapshot();
  });

  test("test borderRadius style",()=>{
    const testRenderer = renderer.create(<App />);
    const testInstance = testRenderer.root;
    expect(testInstance.findByType(TouchableOpacity).props.style.borderRadius).toBe(5);
  });

  test("test paddingVertical style",()=>{
    const testRenderer = renderer.create(<App />);
    const testInstance = testRenderer.root;
    expect(testInstance.findByType(TouchableOpacity).props.style.paddingVertical).toBe(10);
  });

  /**
   * End Test normal
   */



});
