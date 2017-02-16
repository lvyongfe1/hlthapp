var ObjectUtil={
		/**
		 * 判空函数
		 * @param obj
		 * @returns {Boolean}
		 */
		isEmpty: function(obj){
			if(obj==null||obj==undefined||obj=='null'||obj=='undefined'||(obj+'').replace(/(^\s*)|(\s*$)/g, "")==''){
				return true;
			}
			return false;
		},
		/**
		 * 判断元素是否在数组内
		 * @param arr
		 * @param obj
		 * @returns
		 */
		contains: function(arr, obj){
		    var i = arr.length;
		    while (i--) {
		        if (arr[i] === obj) {
		            return true;
		        }
		    }
		    return false;
		},
     isNum:function(s){

      if (!this.isEmpty(s)){

        return !isNaN(s);

      }
       return false;
  }
};

