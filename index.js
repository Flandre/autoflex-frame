let boxCount = 0

const createBox = (...args) => {
  let html = ''
  args.forEach((ele, index) => {
    html += ` 
      <div class="flex-item" id="data-item-${index}">
        <div class="item-container" style="background: #${shader()}">
          <div class="close" data-close-id="${index}"><i class="fas fa-times"></i></div>
          ${ele}
        </div>
      </div>`
  })
  document.querySelector('.flex-container').innerHTML = html
  checkAspectRatio()
  changeBox(args.length)
}

const shader = () => Array(6).fill(0).concat((~~(Math.random() * 16777215)).toString(16).split('')).slice(-6).join('')

const checkAspectRatio = () => {
  if(document.body.clientWidth > document.body.clientHeight){
    changeClass(document.querySelector('.flex-container'), 'flex-row', 'flex-column')
  } else {
    changeClass(document.querySelector('.flex-container'), 'flex-column', 'flex-row')
  }
}

const changeBox = newCount => {
  changeClass(document.querySelector('.flex-container'), `has-${newCount}-box`, `has-${boxCount}-box`)
  boxCount = newCount
}

const changeClass = (ele, newClass, oldClass) => {
  let newClassName = ''
  if(oldClass){
    if(!!ele.className.match(new RegExp("(\\s|^)" + oldClass + "(\\s|$)"))){
      newClassName = ele.className.replace(oldClass, '').trim()
    } else {
      newClassName = ele.className.trim()
    }
  } else {
    newClassName = ele.className.trim()
  }
  if(newClass){
    if(!ele.className.match(new RegExp("(\\s|^)" + newClass + "(\\s|$)"))){
      ele.className = `${newClassName} ${newClass}`.replace(/\s+/g, ' ').trim()
    }
  }
}

document.querySelector('button').onclick = function(e){
  let val = parseInt(document.querySelector('input').value)
  if(val >= 1 && val <= 9){
    createBox(...Array(val).fill(''))
    document.querySelector('body').removeChild(document.querySelector('.input'))
    document.querySelectorAll('.close').forEach(ele => {
      ele.onclick = function(e){
        document.querySelector('.flex-container').removeChild(document.querySelector(`#data-item-${ele.getAttribute('data-close-id')}`))
        changeBox(boxCount - 1)
      }
    })
    window.onresize = function() {
      checkAspectRatio()
    }
  } else {
    alert('请输入合法的数值')
  }
}