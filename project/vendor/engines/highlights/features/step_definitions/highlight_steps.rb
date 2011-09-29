Given /^I have no highlights$/ do
  Highlight.delete_all
end

Given /^I (only )?have highlights titled "?([^\"]*)"?$/ do |only, titles|
  Highlight.delete_all if only
  titles.split(', ').each do |title|
    Highlight.create(:color => title)
  end
end

Then /^I should have ([0-9]+) highlights?$/ do |count|
  Highlight.count.should == count.to_i
end
