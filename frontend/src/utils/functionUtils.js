
const nativeTrim = String.prototype.trim;
const from = 'ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž';
const to = 'aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz';

/*const number = _s.numberFormat(2000, 2);*/
export function numberFormat(number, dec, dsep, tsep) {
   if (isNaN(number) || number == null) return '';

   number = number.toFixed(~~dec);
   tsep = typeof tsep == 'string' ? tsep : ',';

   var parts = number.split('.'),
      fnums = parts[0],
      decimals = parts[1] ? (dsep || '.') + parts[1] : '';

   return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
};

function makeString(object) {
   if (object == null) return '';
   return '' + object;
};
export function capitalize(str, lowercaseRest) {
   str = makeString(str);
   var remainingChars = !lowercaseRest ? str.slice(1) : str.slice(1).toLowerCase();

   return str.charAt(0).toUpperCase() + remainingChars;
};

export function capitalizeWords(str) {
   str = makeString(str);
   return str.replace(/\b\w/g, letter => letter.toUpperCase())
}

function cleanDiacritics(str) {
   return makeString(str).replace(/.{1}/g, function(c){
      var index = from.indexOf(c);
      return index === -1 ? c : to[index];
   });
};

export function titleize(str) {
   return makeString(str).toLowerCase().replace(/(?:^|\s|-)\S/g, function(c) {
      return c.toUpperCase();
   });
};
export function trim(str, characters) {
   str = makeString(str);
   if (!characters && nativeTrim) return nativeTrim.call(str);
   characters = defaultToWhiteSpace(characters);
   return str.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
};

function defaultToWhiteSpace(characters) {
   if (characters == null)
      return '\\s';
   else if (characters.source)
      return characters.source;
   else
      return '[' + escapeRegExp(characters) + ']';
};

function escapeRegExp(str) {
   // eslint-disable-next-line
   return makeString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};

function dasherize(str) {
   return trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
};
export function decapitalize(str) {
   str = makeString(str);
   return str.charAt(0).toLowerCase() + str.slice(1);
};
export function camelize(str, decapitalize) {
   str = trim(str).replace(/[-_\s]+(.)?/g, function(match, c) {
      return c ? c.toUpperCase() : '';
   });

   if (decapitalize === true) {
      return decapitalize(str);
   } else {
      return str;
   }
};
function chars(str) {
   return makeString(str).split('');
};

export function slugify(str) {
   return trim(dasherize(cleanDiacritics(str).replace(/[^\w\s-]/g, '-').toLowerCase()), '-');
};

export function splice(str, i, howmany, substr) {
   var arr = chars(str);
   arr.splice(~~i, ~~howmany, substr);
   return arr.join('');
};
export function insert(str, i, substr) {
   return splice(str, i, 0, substr);
};
export function truncate(str, length, truncateStr) {
   str = makeString(str);
   truncateStr = truncateStr || '...';
   length = ~~length;
   return str.length > length ? str.slice(0, length) + truncateStr : str;
};
export function toNumber(num, precision) {
   if (num == null) return 0;
   var factor = Math.pow(10, isFinite(precision) ? precision : 0);
   return Math.round(num * factor) / factor;
};

export function stripTags(str) {
   return makeString(str).replace(/<\/?[^>]+>/g, '');
};

export function validateEmail(email) {
   let email_trimmed = email.trim();
   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   if (email_trimmed.length === 0) {
      return {isValid: false, error: 'Your email is required!'};
   }
   if (!email_trimmed.match(email_pattern)) {
      return {isValid: false, error: 'Enter a valid email!'};
   }
   return {isValid: true};
};


export function validateName(username) {
   let name_trimmed = username.trim();
   const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;

   if (name_trimmed.length === 0) {
      return {isValid: false, error: 'Your first and last name are required!'};
   }
   if (!name_trimmed.match(name_pattern)) {
      return {isValid: false, error: 'Enter your first and last name!'};
   }

   return {isValid: true};
};


export function validatePassword(password) {
   let password_trimmed = password.trim();

   const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,32}$/i;
   const lowercase_pattern = /^(?=.*[a-z])/g;
   const uppercase_pattern = /^(?=.*[A-Z])/g;
   const digit_pattern = /^(?=.*\d{1,})/g;
   const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;

   if (password_trimmed.length === 0) {
      return {isValid: false, error: 'Your password is required!'};
   }
   if (!password_trimmed.match(lowercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must have at least one lowercase character!'
      };
   }
   if (!password_trimmed.match(uppercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must have at least one uppercase character!'
      };
   }
   if (!password_trimmed.match(digit_pattern)) {
      return {
         isValid: false,
         error: 'Password must have at least one number character!'
      };
   }
   if (!password_trimmed.match(special_pattern)) {
      return {
         isValid: false,
         error: 'Password must include at least one: \'-+_!@#$%^&*?\''
      };
   }
   if (!password_trimmed.match(password_pattern)|| password_trimmed.length >= 33) {
      return {
         isValid: false,
         error: 'Password must have between 8 and 32 characters!'
      };
   }

   return {isValid: true};
};

export function validateUserInfo({username, email, password}) {
   let name_trimmed = username.trim();
   let email_trimmed = email.trim();
   let password_trimmed = password.trim();

   const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;
   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,32}$/i;
   const lowercase_pattern = /^(?=.*[a-z])/g;
   const uppercase_pattern = /^(?=.*[A-Z])/g;
   const digit_pattern = /^(?=.*\d{1,})/g;
   const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;

   if (name_trimmed.length === 0) {
      return {isValid: false, error: 'Your first and last name are required!'};
   }
   if (!name_trimmed.match(name_pattern)) {
      return {isValid: false, error: 'Enter your first and last name!'};
   }
   if (email_trimmed.length === 0) {
      return {isValid: false, error: 'Your email is required!'};
   }
   if (!email_trimmed.match(email_pattern)) {
      return {isValid: false, error: 'Enter a valid email!'};
   }
   if (password_trimmed.length === 0) {
      return {isValid: false, error: 'Your password is required!'};
   }
   if (!password_trimmed.match(lowercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must have at least one lowercase character!'
      };
   }
   if (!password_trimmed.match(uppercase_pattern)) {
      return {
         isValid: false,
         error: 'Password must have at least one uppercase character!'
      };
   }
   if (!password_trimmed.match(digit_pattern)) {
      return {
         isValid: false,
         error: 'Password must have at least one number character!'
      };
   }
   if (!password_trimmed.match(special_pattern)) {
      return {
         isValid: false,
         error: 'Password must include at least one: \'-+_!@#$%^&*?\''
      };
   }
   if (!password_trimmed.match(password_pattern)|| password_trimmed.length >= 33) {
      return {
         isValid: false,
         error: 'Password must have between 8 and 32 characters!'
      };
   }

   return {isValid: true};
};

/*
console.log(number)
console.log(toNumber("2.556"))
console.log(toNumber("2.556", 1))
console.log(capitalize('john'))
console.log(capitalizeWords('john doe'))

console.log(insert("Hellworld", 4, "o "))
console.log(truncate("Hello world", 5))

console.log(slugify2("hello !WorlD   :2345"))
console.log('this is slugify', slugify("hello!WorlD   :2345"))
console.log('this is slugify', slugify('hello!World)  dasd %3455£££++Déjà vu'))

console.log(slugify2("söme stüff with áccènts"))


console.log(dasherize("hello!World"))
console.log(cleanDiacritics("hello!World"))
console.log(numberFormat(300000, 2))*/