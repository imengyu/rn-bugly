require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name             = "RNIMengyuBuglyLib"
  s.version          = package['version']
  s.summary          = package['description']
  s.license          = package['license']

  s.authors          = package['author']
  s.homepage         = package['homepage']
  s.platforms        = { :ios => "9.0" }

  s.source           = { :git => "https://github.com/imengyu/rn-bugly", :tag => "v#{s.version}" }
  s.ios.source_files = "src/ios/**/*.{h,m,mm}"
  s.osx.source_files = "src/macos/**/*.{h,m,mm}"

  s.dependency 'React-Core'
  s.dependency 'Bugly'
end
