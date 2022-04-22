const sumZero = (array) => {
    let wasted = [];
    let copy = [];
    let result = [];
    for (let i = 0; i < array.length; i++) {
        // let current = array[i];
        // if(current < 0 && array.includes(Math.abs(current)))
        // {
        // 	result.push(current,Math.abs(current));
        // 	return result;
        // }
        if (array[i] < 0) {
            wasted.push(array[i]);
        }
        if (array[i] > 0) {
            copy.push(array[i]);
        }
    }
    for (let i = 0; i < wasted.length; i++) {
        for (let j = 0; j < copy.length; j++) {
            if (wasted[i] + copy[j] == 0) {
                result.push(wasted[i]);
                result.push(copy[j]);
                return result;
            }
        }
    }

    return undefined;
};
/*
Write a function called sumZero which accepts a sorted
array of integers. The function should find the first pair
where the sum is O. Return an array that includes both
values that sum to zero or undefined if pair does not exist
*/
console.log("sumZero2");
const sumZero2 = (array) => {
    let result = [];
    let last = array.pop();
    for (let i = 0; i < array.length; ) {
        let current = array[i];
        if (current + last > 0) {
            last = array.pop();
        } else if (current + last < 0) {
            i++;
        } else if (current + last == 0 && current != 0) {
            result.push(current);
            result.push(last);
            return result;
        }
    }
    return undefined;
};
console.log(sumZero2([-7, -5, -4, -1, 0, 1, 3, 6, 9, 11]));
console.log(sumZero2([-5, -3, -2, -1, 0, 1, 2, 3, 4, 6]));
console.log(sumZero2([-2, 0, 1, 3]));
console.log(sumZero2([1, 2, 3]));

//O(n + a*b) where a+b=n

/*
Write a function called averagePair. Given a sorted array of integers and a target average,
determine if there is a pair of values in the array where the average of the pair equals the
target average.
There may be more than one pair that matches the average target.
*/
//O(n)
console.log("averagePair");
const averagePair = (array, target) => {
    const twiceTarget = target * 2;
    let last = array.pop();
    for (let i = 0; i < array.length; ) {
        let current = array[i];
        if (current + last > twiceTarget) {
            last = array.pop();
        } else if (current + last < twiceTarget) {
            i++;
        } else if (current + last == twiceTarget) {
            return true;
        }
    }
    return false;
};

console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8));
console.log(averagePair([1, 2, 3], 2.5));
console.log(averagePair([1, 2, 3], 2));

/*
Given an array of integers and a number, write a function called maxSubarraySum, which finds
the maximum sum of a subarray with the length of the number passed to the function.
Note that a subarray must consist of consecutive elements from the original array.
example below, [100, 200, 300] is a subarray of the original array, but [100, 300] is not.
*/
//O(n)
/*
(n-m+1)*(n+m)
n^2-mn+n+mn-m^2+m
n^2+n+m 
n^2
*/
    //make subarray
    //calculate sum
    //compare result with previous

    // for(let i=0;i<(array.length-length+1);i++){
    // 	subArray = array.slice(i,i+length);
    // 	sum = sumArray(subArray);
    // 	if(sum>maxSum)
    // 	{
    // 		maxSum = sum;
    // 	}
    // }

const maxSubArraySum = (array, length) => {
    let sum = 0;
    let maxSum = 0;
    let counter = 0
    let subArray = [];
    if (length > array.length) {
        return null;
    }
    for (let i = 0; i < array.length; i++) {
        if (subArray.length< length) {
            subArray.push(array[i]);
            sum += array[i];
        }
        if (subArray.length == length) {
        	//console.log(sum);
            if (sum > maxSum) 
            {
                maxSum = sum;
            }
            //const head = subArray.shift();
            const tail = subArray.pop();
            sum -=array[counter];
            counter++;
           
        }
    }
    return maxSum;
};
//with length variable
const maxSubArraySum2 = (array, length) => {
    let sum = 0;
    let maxSum = 0;
    let counter = 0
    let sumLength = 0; // how many element contribute to the sum 
    if (length > array.length) {
        return null;
    }
    for (let i = 0; i < array.length; i++) {
        if (sumLength< length) {
            sum += array[i];
            sumLength++;
        }
        if (sumLength == length) {
            if (sum > maxSum) 
            {
                maxSum = sum;
            }
            sum -=array[counter];
            counter++;
            sumLength = length -1;
        }
    }
    return maxSum;
};
//with length variable
//Further revised code
const maxSubArraySum3 = (array, length) => {
    let sum = 0;
    let maxSum = 0;
    let counter = 0
    let sumLength = 0; // how many element contribute to the sum 
    if (length > array.length) {
        return null;
    }
    for (let i = 0; i < array.length; i++) {
        if (sumLength< length) {
            sum += array[i];
            sumLength++;
        }
        if (sumLength == length) {
        	maxSum = Math.max(maxSum,sum);
            sum -=array[counter];
            counter++;
            sumLength = length -1;
        }
    }
    return maxSum;
};
console.log(maxSubArraySum3([100, 200, 300, 400], 2)); //700
console.log(maxSubArraySum3([100, 200, 300, 400], 4)); //1000
console.log(maxSubArraySum3([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); //39
console.log(maxSubArraySum3([1, 4, 2, 10, 23, 3, 1, 0, 20], 5)); //47
console.log(maxSubArraySum3([1, 4, 2, 10, 23, 3, 1, 0, 20], 9)); //64
console.log(maxSubArraySum3([-3, 4, 0, -2, 6, -1], 2)); //5
console.log(maxSubArraySum3([3, -2, 7, -4, 1, -1, 4, -2, 1], 2)); //5
console.log(maxSubArraySum3([2, 3], 3));// null


/*
Write a function called minSubArrayLen which accepts two parameters - an array of positive
integers and a positive integer.
This function should return the minimal length of a contiguous subarray of which the sum is
greater than or equal to the integer passed to the function. If there isn't one, return O instead.
Examples:
*/
const minSubArrayLen = (array,compare) =>
{
	//make subarray
    //calculate sum
    //compare result with compare
    let sum = 0;
    let subArray = [];
    let minlength = Infinity;
    for(let i=0;i<array.length;i++)
    {
    	/*if (sumLength < length) {
            sum += array[i];
            sumLength++;
        }
        if (sumLength == length) {
            if (sum > maxSum) 
            {
                maxSum = sum;
            }
            sum -=array[counter];
            counter++;
            sumLength = length -1;
        }*/

    	// subArray.push(array[i]);
    	// sum += array[i]
    	// if(sum>=compare && subArray.length<minlength)
    	// {
    	// 	console.log(subArray);
    	// 	minlength = subArray.length;
    	// 	subArray.pop();
    	// 	// subArray = [];
    	// }
    	// else{subArray.push(array[i]);}
    }
    return (minlength !== Infinity)? minlength : 0;
}
// 0 1 or >1
const minSubArrayLen2 = (array,compare) =>
{
    let sum = 0;
    let length =0;
    let minlength = Infinity;
    let head = 0;
    for(let i=0;i<array.length+1;i++)
    {
    	if(array[i] >= compare)
    	{
    		return 1;
    	}
    	//calculate sum
    	if(sum < compare)
    	{
    		sum+=array[i];
    		length++
    	}
    	//compare result with compare
    	if(sum >= compare)
    	{
    		minlength = Math.min(minlength,length);
    		//tackle reduce sum and length
    		sum-=array[head];
    		head++;
    		length--;
    		//if(sum >=compare){minlength = Math.min(minlength,head);}
    		//console.log(i)
    		/*if(sum - array[head] < compare)
    		{
    			sum = 0;
    			length = 0;
    		}
    		else{
    			sum -= array[head];
    			head++;
    			length--;
    			console.log("here");
    		}*/
    	}
    }
    //console.log(sum);
    return (minlength !== Infinity)? minlength : 0;
}
console.log("minSubArrayLen3");
const minSubArrayLen3 = (array,compare) =>
{
    let sum = 0;
    let length =0;
    let minlength = Infinity;
    let head = 0;
    while(head < array.length)
    {
    	if(array[length] >= compare)
    	{
    		return 1;
    	}
    	//calculate sum
    	if(sum < compare && length< array.length)
    	{
    		sum+=array[length];
    		length++
    	}
    	//compare result with compare
    	else if(sum >= compare)
    	{
    		minlength = Math.min(minlength,length-head);
    		//tackle reduce sum and length
    		sum-=array[head];
    		head++;
    		//length--;
    	} 
    	else {break;}
    }
    return (minlength !== Infinity)? minlength : 0;
}
console.log(minSubArrayLen3([2,3,1,2,4,3], 7)); // 2 -> because [4,3] is the smallest subarray
console.log(minSubArrayLen3([2,1,6,5,4], 9)); // 2 -> because [5,4] is the smallest subarray
console.log(minSubArrayLen3([1,4,16,22,5,7,8,9,10],39)); //3 ->16,22,5 or 4,16,22
console.log(minSubArrayLen3([1,4,16,22,5,7,8,9,10],55)); // 5->[16,22,5,7,8]
console.log(minSubArrayLen3([4, 3, 3, 8, 1, 2, 3], 11)); // 2 ->[3,8]
console.log(minSubArrayLen3([3,1,7,11,2,9,8,21,62,33,19], 52)); // 1 -> because [62] is greater than 52
console.log(minSubArrayLen3([1,4,16,22,5,7,8,9,10],95)); // 0
// Or the sum of the whole array equals to compare then return length of array
console.log(minSubArrayLen3([2,3,1,2,4,3], 15)); // 6 -> because the whole array is the smallest subarrayor depends on last element size

/*
Write a function called findLongestSubstring, which accepts a string and returns the length of
the longest substring with all distinct characters.
*/
console.log("findLongestSubstring");
/*
const findLongestSubstring = (text) =>
{
	// for character t

	//  if h,i,s is not repeated then // length increment 
	
	// found repeated character 
	// max length operation
	let length = 1;
	let maxLength = 0;
	text = text.toLowerCase();
	if(text.length <= 1){return text.length}
	for(let i=1;i<text.length;i++)
	{
		for(let j=0;j<i;j++)
		{
			// console.log(i,j);
			if(i!=j && text[i]==text[j])
			{
				break;
			}
		}
	}
	return maxLength;
}

const findLongestSubstring2 = (array) =>
{
	let length = 0;
	let maxlength = 0;
	let head = 0;
	let maxlength2 = 0;
	let subArray = [];
	if(array.length <= 1){return text.length}
	subArray.push(array[0]);
	for(let i = 1;i<array.length;i++)
	{
		if(!subArray.includes(array[i]))
		{
			length++
			subArray.push(array[i]);
		}
		else
		{
			maxlength = Math.max(maxlength,subArray.length);
			maxlength2 = Math.max(maxlength2,length+1 - head);
			subArray.shift();
			head++
		}
	}
	console.log(maxlength,maxlength2);
	return maxlength;
}
*/
const findLongestSubstring2 = (array) =>
{
	let length = 1;
	let maxlength = 0;
	let head = 0;
	let maxlength2 = 0;
	let subArray = [];
	if(array.length <= 1){return array.length}
	subArray.push(array[0]);
	// for(let i = 1;i<array.length;i++)
	// {
	// 	if(!subArray.includes(array[i]))
	// 	{
	// 		length++
	// 		subArray.push(array[i]);
	// 	}
	// 	else
	// 	{
	// 		maxlength = Math.max(maxlength,subArray.length);
	// 		maxlength2 = Math.max(maxlength2,length - head + 1);
	// 		subArray.shift(array[head]);
	// 		head++
	// 	}
	// 	console.log(subArray,subArray.length);
	// }
	while(head<array.length)
	{
		if(length < array.length && !subArray.includes(array[length]))
		{
			subArray.push(array[length]);
			length++;
		}
		else
		{
			maxlength = Math.max(maxlength,subArray.length);
			maxlength2 = Math.max(maxlength2,length - head + 1);
			subArray.shift(array[head]);
			head++
		}
		console.log(subArray,subArray.length);
	}
	maxlength = Math.max(maxlength,subArray.length);
	maxlength2 = Math.max(maxlength2,length - head + 1);
	// console.log(maxlength,maxlength2);
	return maxlength;
}
// console.log(findLongestSubstring2(['b','b','b','b'])); //1;
// console.log(findLongestSubstring2(['r','i','t','h','m','s','c','h','o','o','l'])); //7; ->rithmsc
// console.log(findLongestSubstring2(['t','h','i','s','i','s','a','w','e','s','o','m','e'])); //6; ->awesom
// console.log(findLongestSubstring2(['t','h','e','c','a','t','i','n','t','h','e','h','a','t'])); //7; ->hecatin
// console.log(findLongestSubstring2(['l','o','n','g','e','s','t','s','t','s','u','b','s','t','r','i','n','g'])); //8; ->ubstring
// console.log(findLongestSubstring2(['t','h','i','s','i','s','h','o','w','w','e','d','o','i','t'])); //6; -> wedoit
const findLongestSubstring = (array) =>
{
	let length = 1;
	let maxlength = 0;
	let head = 0;
	let maxlength2 = 0;
	let subSet = new Set();
	if(array.length <= 1){return array.length}
	subSet.add(array[0]);
	/*for(let i = 1;i<array.length;i++)
	{
		if(!subSet.has(array[i]))
		{
			length++
			subSet.add(array[i]);
		}
		else
		{
			maxlength = Math.max(maxlength,subSet.size);
			// maxlength2 = Math.max(maxlength2,length - head + 1);
			subSet.delete(array[head]);
			console.log(array[head],subSet,subSet.size);
			head++
		}
		// console.log(subSet,subSet.size);
	}*/
	while(head<array.length)
	{
		if(length < array.length && !subSet.has(array[length]))
		{
			subSet.add(array[length]);
			length++;
		}
		else
		{
			maxlength = Math.max(maxlength,subSet.size);
			maxlength2 = Math.max(maxlength2,length - head + 1);
			subSet.delete(array[head]);
			head++
		}
		//console.log(subSet,subSet.size);
	}
	// console.log(subSet,subSet.size);
	maxlength = Math.max(maxlength,subSet.size);
	return maxlength;
}
console.log(findLongestSubstring('')); //0;
console.log(findLongestSubstring('b')); //1;
console.log(findLongestSubstring('bbbbb')); //1;
console.log(findLongestSubstring('rithmschool')); //7; ->rithmsc
console.log(findLongestSubstring('thisisawesome')); //6; ->awesom
console.log(findLongestSubstring('thecatinthehat')); //7; ->hecatin
console.log(findLongestSubstring('longeststsubstring')); //8; ->ubstring
console.log(findLongestSubstring('thisishowwedoit')); //6; -> wedoit

/*
Given List of words, return shortest unqiue prefix of each word
[dog,cat,apple,april,fish]
[d,c,app,apr,f]
*/

/*
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.
https://leetcode.com/problems/add-two-numbers/
*/
//For Own Testing
 class Node 
 {
 	constructor(val)
 	{
 		this.val = (val===undefined ? 0 : val)
 	    this.next = null;
 	}
 }
 class LinkList 
 {
 	constructor()
 	{
 		this.head = null;
 	}
 	append(val)
 	{
 		if(this.head == null)
 		{
 			this.head = new Node(val);
 			return;
 		}
 		let curr = this.head;
 		while(curr.next!=null)
 		{
 			curr = curr.next;
 		}
 		curr.next = new Node(val);
 	}
 	print()
 	{
 		let message = "[";
 		let curr = this.head;
 		while(curr!= null)
 		{
 			message+=curr.val.toString() + ',';
 			curr = curr.next;
 		}
 		message+=']';
 		console.log(message);
 	}
 }

console.log("addTwoNumbers");
//Case 1:[2,4,3],[5,6,4] = [7,0,8]
let link = new LinkList();
link.append(2);
link.append(4);
link.append(3);
let link1 = new LinkList();
link1.append(5);
link1.append(6);
link1.append(4);

// Case 2:[0],[0] = [0]
let link2 = new LinkList();
link2.append(0);

// Case 3:[9,9,9,9,9,9,9],[9,9,9,9] = [8,9,9,9,0,0,0,1]
let link3 = new LinkList();
for(let i=0;i<7;i++)
{
	link3.append(9);
}
link3.print();
let link4 = new LinkList();
for(let i=0;i<4;i++)
{
	link4.append(9);
}
link4.print();
const addTwonNmbers = (l1,l2) =>
{
	let larger10 = 0;
	let resultValue = 0;
	let resultNode = new LinkList();
	let link1 = l1.head;
	let link2 = l2.head;
	while(link1!=null || link2!=null)
	{
		// Deal with the value of the node
		// possible case is 1 null node + larger10
		// possible case is 2 nodes + larger10
		let val1 = (link1 ===null? 0 : link1.val);
		let val2 = (link2 ===null? 0 : link2.val);//console.log(val1,' ',val2,' ',larger10);
		resultValue = val1+val2+larger10;
		if(resultValue>=10)
		{
			resultValue %=10;
			larger10 = 1;
		}
		else 
		{
			larger10 = 0;
		}
		// Deal with node connection with result
		resultNode.append(resultValue);
		// Move forward with the linkList
		if(link1!=null)
		{
			link1 = link1.next;
		}
		if(link2!=null)
		{
			link2 = link2.next;
		}
	}
	if(larger10 == 1)
	{
		resultNode.append(larger10);
	}
	return resultNode;
}
// console.log(addTwonNmbers([2,4,3],[5,6,4])); //[7,0,8]
console.log(addTwonNmbers(link,link1).print());
// console.log(addTwonNmbers([0],[0])); //[0]
console.log(addTwonNmbers(link2,link2).print());
// console.log(addTwonNmbers([9,9,9,9,9,9,9],[9,9,9,9])); //[8,9,9,9,0,0,0,1]
console.log(addTwonNmbers(link3,link4).print());

// Leetcode version medium
/**
 * Definition for singly-linked list.
 * class ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
 var add2Num = function(l1, l2) {
 	let larger10 = 0;
	let resultValue = 0;
	let resultNode = new ListNode();
    let head = resultNode;
	while(l1!=null || l2!=null)
	{
		let val1 = (l1 ===null? 0 : l1.val);
		let val2 = (l2 ===null? 0 : l2.val);
		resultValue = val1+val2+larger10;
		if(resultValue>=10)
		{
			resultValue %=10;
			larger10 = 1;
		}
		else {larger10 = 0;}
		// Deal with node connection with result
        //console.log(resultValue);
		resultNode.val = (resultValue);
        if((l1!=null&&l1.next!=null)||(l2!=null&&l2.next!=null))
        {
            resultNode.next = new ListNode();
            resultNode = resultNode.next;
        }
		// Move forward with the linkList
		if(l1!=null){l1 = l1.next;}
		if(l2!=null){l2 = l2.next;}
	}
	if(larger10 == 1){resultNode.next = new ListNode(larger10);}
	return head;
};

/*
Leetcode Hard Level
Given two sorted arrays nums1 and nums2 of size m and n respectively, 
return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).
*/
console.log("Median of Two Sorted Arrays");
//O(n*log(n)) where n = nums1.length + nums2.length
const findMedianSortedArrays = (nums1,nums2) =>
{
	// Step:somehow merge the 2 given arrays and sort them out;
	let tempArray = [];
	for(let i=0;i<nums1.length;i++)
	{
		tempArray.push(nums1[i]);
	}
	for(let j=0;j<nums2.length;j++)
	{
		tempArray.push(nums2[j]);
	}
	tempArray.sort(function(a, b) {
  		return a - b;
	});
	// let sortedArray = [1,2,3,4];
	// Step:determine the median position and find median
	let totalLength = (nums1.length + nums2.length);
	let medianPos = Math.floor(totalLength/2);;
	let median = (totalLength%2==0)?((tempArray[medianPos-1]+tempArray[medianPos])/2) : tempArray[medianPos];
	return median;
};
console.log(findMedianSortedArrays([1,3],[2]));//2.000
console.log(findMedianSortedArrays([1,2],[3,4]));//2.500


console.log("Median of Two Sorted Arrays2");
// O(log(min(m,n))) where m,n are input size of arrays
// Involves binary search which contribute to the log part of Big O
const findMedianSortedArrays2 = (nums1,nums2) =>
{
	let totalLength = (nums1.length + nums2.length);
	// Declare the median position
	let medianPos = Math.floor(totalLength/2);
	//Odd or even length has different median searching method
	let medianMode = totalLength%2;
	let longerArray = (nums1.length>nums2.length)?nums1:nums2;
	let shorterArray = (nums1.length>nums2.length)?nums2:nums1;
	//console.log(longerArray,shorterArray);

	// Binary Search part // https://www.youtube.com/watch?v=m2QzEG8IqxI
	let left = 0;
	let right = shorterArray.length - 1;
	while(true)
	{
		// Declare position variables
		// Partition of short + partition of longer = medianPos
		// While medianPos is length and SM and LM are both indexes
		// So (SMindex + 1) +(LMindex + 1)  = length 
		let shortMid = Math.floor((right+left)/2);
		let longMid = medianPos - shortMid - 2;
		// Declare var with accessing value inside the arrays
		let longLeft = (longMid >= 0) ? longerArray[longMid] : -Infinity;
		let shortLeft = (shortMid >= 0) ? shorterArray[shortMid] : -Infinity;

		let longRight = (longMid + 1 < longerArray.length) ? longerArray[longMid+1] : Infinity;
		let shortRight = (shortMid + 1 < shorterArray.length) ? shorterArray[shortMid+1] : Infinity;
		// console.log("Message Short",shortLeft,'',shortMid,'',shortRight);
		// console.log("Message Long",longLeft,'',longMid,'',longRight);
		// Want to guarntee every element on the left is smaller than those in the right
		if(longLeft <= shortRight && shortLeft <= longRight)
		{
			if(medianMode)
			{
				return Math.min(shortRight,longRight);
			}
			else
			{
				return (Math.max(shortLeft,longLeft)+Math.min(shortRight,longRight))/2;
			}
		}
		else if(longLeft > shortRight)
		{
			left = shortMid + 1;
		}
		else
		{
			right = shortMid - 1;
		}
		// console.log("Left Right",left,right);
	}
};
// medianPos = 4
// shortMid = 1
// LongMid = 4 - 1 - 2 = 1
console.log(findMedianSortedArrays2([1,2,3,4,5],[6,7,8,9]));//5
console.log(findMedianSortedArrays2([1,3,5],[4,10]));//4
console.log(findMedianSortedArrays2([1,3,5,11],[4,10]));//4.5
console.log(findMedianSortedArrays2([1,2],[3,4]));//2.500
console.log(findMedianSortedArrays2([1,3],[2]));//2.000

// My takeaway message after doing all of those 
// How well I understand the problem itself
// New understanding for every kind of issue 
